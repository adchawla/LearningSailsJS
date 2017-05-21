/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  connection: 'myPostgresqlServer',
  migrate: 'drop',

  attributes: {
    email: { type: 'string', email: true, unique: true },

    username: { type: 'string', unique: true },

    encryptedPassword: { type: 'string' },

    gravatarURL: { type: 'string' },

    deleted: { type: 'string' },

    admin: { type: 'string' },

    banned: { type: 'string' },

    toJSON: function() {
      var modelAttributes = this.toObject();
      delete modelAttributes.encryptedPassword;
      return modelAttributes;
    }
  },

  
};

