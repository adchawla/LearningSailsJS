/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var EmailAddress = require('machinepack-emailaddresses');
var Passwords = require('machinepack-passwords');
var Gravatar = require('machinepack-gravatar');

module.exports = {
  signup: function (req, res) {
    if (_.isUndefined(req.param('email'))) {
      return res.badRequest('An email address is required!');
    }

    if (_.isUndefined(req.param('password'))) {
      return res.badRequest('A Password is required!');
    }
    if (req.param('password').length < 6) {
      return res.badRequest('Password must be atleast 6 characters!');
    }

    if (_.isUndefined(req.param('username'))) {
      return res.badRequest('A username is required!');
    }
    if (req.param('username').length < 6) {
      return res.badRequest('Username must be atleast 6 characters!');
    }
    if (!_.isString(req.param('username')) || req.param('username').match(/[^a-z0-9]/i)) {
      return res.badRequest('Invalid username: must consists of numbers and letters only');
    }
    EmailAddress.validate({
      string: req.param('email')
    }).exec({
      error: function (err) {
        res.serverError(err);
      },
      invalid: function () {
        res.badRequest('Doesn\'t look like an email address to me');
      },
      success: function () {
        // Encrypt a string using the BCrypt algorithm.
        Passwords.encryptPassword({
          password: req.param('password'),
        }).exec({
          // An unexpected error occurred.
          error: function (err) {
            res.serverError(err);
          },
          // OK.
          success: function (result) {
            try {
              var gravatarURL = Gravatar.getImageUrl({
                emailAddress: req.param('email')
              }).execSync();
              var options = {
                email: req.param('email'),
                username: req.param('username'),
                password: result,
                gravatarURL: gravatarURL
              };
              // adding the user to the User Table
              User.create(options).exec(
                function (err, createdUser) {
                  if (err) {
                    if (err.invalidAttributes && err.invalidAttributes.email &&
                      err.invalidAttributes.email[0] &&
                      err.invalidAttributes.email[0].rule === 'unique') {

                      return res.send(409, 'Email address is already taken by another user, please try again.');
                    }

                    if (err.invalidAttributes && err.invalidAttributes.username &&
                      err.invalidAttributes.username[0] &&
                      err.invalidAttributes.username[0].rule === 'unique') {

                      return res.send(409, 'Username is already taken by another user, please try again.');
                    }

                    return res.negotiate(err);
                  }
                  return res.json(createdUser);
                }
              );
            } catch (err) {
              return res.serverError(err);
            }
          },
        });
      },
    });


  }
};
