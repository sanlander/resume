const Joi = require("joi");

const validateResultJoi = (schema, req, res, next) => {
  const result = schema.validate(req.body);

  if (result.error) {
    return res.status(400).json({ status: result.error.details[0].message });
  }
  return next();
};

const validateDataForm = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().max(30).email().required(),
    phone: Joi.string().min(10).required(),
  });

  validateResultJoi(schema, req, res, next);
};

module.exports = {
  validateDataForm,
};
