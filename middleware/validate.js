const validator = require('../helpers/validate');

const validateMovie = (req, res, next) => {
  const validationRule = {
    title: 'required|string',
    'mainCharacter.name': 'required|string',
    'mainCharacter.occupation': 'string',
    'mainCharacter.hometown': 'string',
    'mainCharacter.currentCity': 'string',
    'mainCharacter.loveInterest': 'string',
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
