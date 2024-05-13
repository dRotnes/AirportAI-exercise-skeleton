const Product = require('../models/Product');

// Search product by keyword and date
const search_by_keyword= async (req, res, next) => {
    const {keyword , date} = req.body

    try {
        // Search for item where keyword matches and date is lower or equal to the one passed
        const query = {
            $text: {$search: `"${keyword}"`}, 
            createdAt: {$gte: new Date(new Date(date).setHours(0,0,0))} 
        };
        const products = await Product.find(query).sort({created_at: 'asc'});
        if(products.length == 0){
            return res.status(404).json({ message: 'No products to list' });
        }
        res.json({ products });
    } catch (error) {
        return res.status(500).json({error: error.message})
        // next(error);
    }
};

// Search product by description and date
const search_by_description = async (req, res, next) => {
    const { description } = req.body

    try {
        const query = {
            $text: {$search: description}, 
        };
        const products = await Product.find(query);
        if(products.length == 0){
            return res.status(404).json({ message: 'No products to list' });
        }
        res.json({ products });
    } catch (error) {
        return res.status(500).json({error: error.message})
        // next(error);
    }
};
module.exports = { search_by_keyword, search_by_description}