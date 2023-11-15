const Joi = require("joi");

exports.authSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(5).max(10).required(),
});
