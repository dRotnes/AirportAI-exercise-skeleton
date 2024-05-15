const Product = require('../models/Product');
const Report = require('../models/LossReport');

// Create loss report
const report_loss = async (req, res, next) => {
    const { 
        name,
        last_name,
        nationality,
        document_number,
        contact,
        email,
        address,
        loss_description,
        loss_time,
    } = req.body;
  
    try {
        const report = new Report({ 
            name,
            last_name,
            nationality,
            document_number,
            contact,
            email,
            address,
            loss_description,
            loss_time,
        });
        await report.save();
        res.status(200).json({ message: 'Report created successfully', report: report });
    } catch (error) {
        next(error);
        // return res.status(500).json({error: error.message})
    }
  };

// Search product by keyword and date
const search_by_keyword= async (req, res, next) => {
    const {keyword , date} = req.body

    try {
        // Search for item where keyword matches and date is greater or equal to the one passed
        let query = {
            $text: { $search: `"${keyword}"` }
        };

        if (date) {
            query.createdAt = { $gte: new Date(new Date(date).setHours(0, 0, 0)) };
        }

        const products = await Product.find(query).sort({created_at: 'asc'});
        if(products.length == 0){
            return res.status(404).json({ message: 'No products to list' });
        }
        res.status(200).json({ products });
    } catch (error) {
        // return res.status(500).json({error: error.message})
        next(error);
    }
};

// Search product by description and date
const search_by_description = async (req, res, next) => {
    const {description, date} = req.body

    try {
        // Search for item where description matches and date is greater or equal to the one passed
        let query = {
            $text: { $search: description} 
        };

        if (date) {
            query.createdAt = { $gte: new Date(new Date(date).setHours(0, 0, 0)) };
        }

        const products = await Product.find(query).sort({created_at: 'asc'});
        if(products.length == 0){
            return res.status(404).json({ message: 'No products to list' });
        }
        res.status(200).json({ products });
    } catch (error) {
        // return res.status(500).json({error: error.message})
        next(error);
    }
};
module.exports = { search_by_keyword, search_by_description, report_loss}