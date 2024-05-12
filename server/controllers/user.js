const Product = require('../models/Product');

// Search product by keyword
const search_by_keyword = async (req, res, next) => {
    const {
        keyword
    } = req.body

    try {
        const query = {
            $text: { $search: keyword } 
        };
        const products = await Product.find(query);
        if(products.length == 0){
            return res.status(404).json({ message: 'No products to list' });
        }
        res.json({ products });
    } catch (error) {
        next(error);
    }
};
module.exports = { search_by_keyword }