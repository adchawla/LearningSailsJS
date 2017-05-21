/**
 * LifeController
 *
 * @description :: Server-side logic for managing lives
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var  Meaning = require('the-ultimate-question')
module.exports = {
	purpose: function(req, res) {
        return res.json({
            answer: Meaning.answer(),
            question: Meaning.question()
        });
    }
};

