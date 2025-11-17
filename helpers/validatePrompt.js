const validator = require('./validate');

const validatePrompt = (req, res, next) => {
  const validationRule = {
    prompt: 'required|string',
    type: 'required|string'
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

module.exports = { validatePrompt };
