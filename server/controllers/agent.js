const jwt = require('jsonwebtoken');
const Product = require('../models/Product');

// Add a new Product
const add_product = async (req, res, next) => {
  const { product_name, added_by, description } = req.body;

  try {
    const product = new Product({ product_name, added_by, description });
    await product.save();
    res.json({ message: 'Product added to Lost and Founds successfull' });
  } catch (error) {
    next(error);
  }
};

// List all products
const list_all = async (req, res, next) => {
  try {
    const products = await Product.find();
    if(products.length == 0){
      return res.status(404).json({ message: 'No products to list' });
    }

    res.json({ products });
  } catch (error) {
    next(error);
  }
};

// Delete product
const delete_product = async (req, res, next) => {
  try {
    const { product_id } = req.body;
    const product = await Product.deleteOne({_id:product_id})
    
    if(product.deletedCount == 0){
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json({message: `Product with id ${product_id} deleted successfully`})
  } catch (error) {
    next(error);
  }
};

// Update product status
const update_product_status = async (req, res, next) => {
  try {
    var product_id  = req.query.product_id;
    const product = await Product.updateOne({_id:product_id}, {$set: {retrieved: true}})
    
    if(!product.nModified == 0){
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json({message: `Product with id ${product_id} updated successfully`})
  } catch (error) {
    next(error);
  }
};
module.exports = { add_product, list_all , delete_product, update_product_status}