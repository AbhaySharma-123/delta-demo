const Joi = require("joi");

// Listing validation schema

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),

    image: Joi.alternatives().try(
      Joi.object({
        url: Joi.string().uri().required(),
        filename: Joi.string().allow('').optional()
      }),
      Joi.string().uri().allow('') // ✅ Allow empty string here
    ).optional(),

    price: Joi.number().required().min(0),
  }).required(),
});



// Review validation schema
module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required(),
  }).required(),
});
