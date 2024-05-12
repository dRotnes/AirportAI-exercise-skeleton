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
    if(!products){
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
    
    const product = await Product.findOne({product_id});

    if(!product){
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// // Login with an existing user
// const login = async (req, res, next) => {
//   const { username, password } = req.body;

//   try {
//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const passwordMatch = await user.comparePassword(password);
//     if (!passwordMatch) {
//       return res.status(401).json({ message: 'Incorrect password' });
//     }

//     const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
//       expiresIn: '1 minute'
//     });
//     res.json({ token });
//   } catch (error) {
//     next(error);
//   }
// };

module.exports = { add_product, list_all , delete_product}