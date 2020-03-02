const Joi = require("joi");

module.exports.validateGenre = genre => {
  let schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(genre, schema);
};

module.exports.validateMovie = movie => {
  let schema = {
    title: Joi.string()
      .min(3)
      .required(),
    plot: Joi.string().min(30),
    stock: Joi.number(),
    genre: Joi.string(),
    price: Joi.number()
  };
  return Joi.validate(movie, schema);
};

module.exports.validateUser = user => {
  let schema = {
    firstname: Joi.string().min(3),
    lastname: Joi.string().min(3),
    phone: Joi.number().min(8),
    email: Joi.string()
      .min(5)
      .required(),
    password: Joi.string()
      .min(8)
      .max(1024)
      .required(),
    isGold: Joi.boolean(),
    isAdmin: Joi.boolean()
  };
  return Joi.validate(user, schema);
};

module.exports.validateRating = rating => {
  rating: Joi.number()
    .min(1)
    .max(5)
    .required();
};
