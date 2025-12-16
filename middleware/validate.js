const validator = require('../helpers/validate');

const validateMovie = (req, res, next) => {
  const validationRule = {
    timestamp: 'required|string',
    title: 'required|string',
    mainCharacterName: 'required|string',
    mainCharacterOccupation: 'string',
    mainCharacterHometown: 'string',
    mainCharacterCurrentCity: 'string',
    mainCharacterLoveInterest: 'string',
    loveInterestOccupation: 'string',
    tragicBackstory: 'string',
    conflict: 'required|string',
    howChristmasIsSaved: 'required|string',
    lessonLearned: 'string',
    movieRating: 'required|integer|min:1|max:5'
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      return res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    }

    next();
  });
};

module.exports = { validateMovie };
