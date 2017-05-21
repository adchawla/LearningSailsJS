/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	signup: function(req, res) {
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
        var options = {
            email: req.param('email'),
            username: req.param('username'),
            password: req.param('password')
        }
        return res.json(options);
  }
};

