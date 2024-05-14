const Product = require('../models/Product');
const Report =  require('../models/LossReport');
// Add a new product
const add_product = async (req, res, next) => {
  const { 
      product_name,
      product_category, 
      product_brand,
      product_color,
      product_country,
  } = req.body;

  try {
    //Add product to database
    const product = new Product({ 
      product_name, 
      product_category, 
      product_brand,
      product_color,
      product_country,
    });
    await product.save();

    //Check if product matches existing report description
    const query = {
        $text: {$search: product_name},
        status:'open'
        //Can extend to filter by loss_time also, to ensure that the user is not just saying its theirs maliciously
    };
    const reports = await Report.find(query).sort({createdAt:'desc'});

    if(reports.length > 0){
      res.status(200).json({ message: 'Product added to Lost and Founds successfully', possible_matching_reports:reports });
    }

    res.status(200).json({ message: 'Product added to Lost and Founds successfully' });
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
};

// List all products
const list_all_products = async (req, res, next) => {
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

// List all reports
const list_all_reports = async (req, res, next) => {
  try {
    const reports = await Report.find();
    if(reports.length == 0){
      return res.status(404).json({ message: 'No reports to list' });
    }

    res.json({ reports });
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

// Delete report
const delete_report = async (req, res, next) => {
  try {
    const { report_id } = req.body;
    const report = await Report.deleteOne({_id:report_id})
    
    if(report.deletedCount == 0){
      return res.status(404).json({ message: 'Report not found' });
    }

    return res.status(200).json({message: `Report with id ${report_id} deleted successfully`})
  } catch (error) {
    // next(error)
    return res.status(500).json({error: error.message})
  }
};

// Update product status
const update_report_status = async (req, res, next) => {
  try {
    const { report_id } = req.body;
    const report = await Report.updateOne({_id:report_id}, {$set: {status: 'closed - product retrieved'}})
    
    if(report.modifiedCount == 0){
      return res.status(404).json({ message: 'Report not found' });
    }

    return res.status(200).json({message: `Report with id ${report_id} updated successfully`})
  } catch (error) {
    // next(error)
    return res.status(500).json({error: error.message})
  }
};
module.exports = { 
  add_product, 
  list_all_products, 
  list_all_reports,
  delete_product, 
  delete_report,
  update_report_status
}