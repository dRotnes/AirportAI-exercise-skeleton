const Product = require('../models/Product');

// Add a new product
const add_product = async (req, res, next) => {
  const { 
      product_name,
      product_category, 
      product_brand,
      product_color,
      product_country,
      description,
  } = req.body;

  try {
    const added_by = req.user.username;
    const product = new Product({ 
      product_name, 
      product_category, 
      product_brand,
      product_color,
      product_country,
      description, 
      added_by  
    });
    await product.save();
    res.json({ message: 'Product added to Lost and Founds successfully' });
  } catch (error) {
    return res.status(500).json({error: error.message})
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
    return res.status(500).json({error: error.message})
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
    // next(error)
    return res.status(500).json({error: error.message})
  }
};

// Update product status
const update_product_status = async (req, res, next) => {
  try {
    const { product_id } = req.body;
    const product = await Product.updateOne({_id:product_id}, {$set: {retrieved: true, status: 'closed'}})
    // console.log(product)
    if(product.modifiedCount == 0){
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json({message: `Product with id ${product_id} updated successfully`})
  } catch (error) {
    // next(error)
    return res.status(500).json({error: error.message})
  }
};
module.exports = { add_product, list_all , delete_product, update_product_status}