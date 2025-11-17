const validator = require('../helpers/validate');

const validateGift = (req, res, next) => {
  const validationRule = {
    item: 'required|string',
    price: 'string',
    purchased: 'boolean',
    familyMember: 'string'
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

module.exports = { validateGift };
