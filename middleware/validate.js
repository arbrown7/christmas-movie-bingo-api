const validator = require('../helpers/validate');

const validateFamilyMember = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    birthday: 'required|string',
    anniversary: 'string',
    relation: 'required|string',
    shirtSize: 'string',
    pantSize: 'string',
    shoeSize: 'string'
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      return res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    }

    const arrayFields = ['interests', 'birthdayGiftIdeas', 'christmasGiftIdeas', 'anniversaryGiftIdeas'];
    for (const field of arrayFields) {
      const value = req.body[field];
      if (!value || !Array.isArray(value) || value.some(v => typeof v !== 'string')) {
        return res.status(412).send({
          success: false,
          message: `${field} is required and must be an array of strings`
        });
      }
    }

    const dateFields = ['birthday', 'anniversary'];
    for (const field of dateFields) {
      const value = req.body[field];
      if (value && isNaN(Date.parse(value))) {
        return res.status(412).send({
          success: false,
          message: `${field} must be a valid date string`
        });
      }
    }

    next();
  });
};

module.exports = { validateFamilyMember };
