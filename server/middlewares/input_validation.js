
const Joi = require('@hapi/joi');

/*
    Schema for user registering:
    username between 3 and 30 characters REQUIRED
    email REQUIRED
    password between 6 and 30 characters REQUIRED
    role alphanumeric
*/
const register_schema = Joi.object({
    username:Joi.string().allow('_').min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required(),
    role: Joi.string().allow('').alphanum()
});

const validate_register_input = (req, res, next) => {
    const { error } = register_schema.validate(req.body);
  
    if (error) {
      return res.status(400).send({message: error.details[0].message});
    }
  
    next();
};

/*
    Schema for adding new product:
    product_name minimum 5 characters REQUIRED
    product_category alphanumeric REQUIRED
    product_brand alphanumeric
    product_color alphanumeric
    product_country alphanumeric
    description minimum 20 characters REQUIRED
*/
const add_product_schema = Joi.object({
    product_name:Joi.string().min(5).required(),
    product_category:Joi.string().alphanum().required(), 
    product_brand:Joi.string().alphanum().allow(''),
    product_color:Joi.string().alphanum().allow(''),
    product_country:Joi.string().alphanum().allow(''),
    description:Joi.string().min(20)
});
const validate_add_product_input = (req, res, next) => {
    const { error } = add_product_schema.validate(req.body);
  
    if (error) {
      return res.status(400).send({message: error.details[0].message});
    }
  
    next();
};

/*
    Schema for adding new product:
    product_id base 64 REQUIRED
*/

const delete_and_update_product_schema = Joi.object({
    product_id:Joi.string().base64().required(),
});
const validate_delete_and_update_product_input = (req, res, next) => {
    const { error } = delete_and_update_product_schema.validate(req.body);
  
    if (error) {
      return res.status(400).send({message: error.details[0].message});
    }
  
    next();
};

/*
    Schema for searching for a product:
    keyword 
*/

const search_by_keyword_schema = Joi.object({
    keyword:Joi.string().alphanum().max(30).required(),
    date: Joi.date()
});
const validate_search_by_keyword_input = (req, res, next) => {
    const { error } = search_by_keyword_schema.validate(req.body);
  
    if (error) {
      return res.status(400).send({message: error.details[0].message});
    }
  
    next();
};

module.exports = {validate_register_input, validate_add_product_input, validate_delete_and_update_product_input, validate_search_by_keyword_input};