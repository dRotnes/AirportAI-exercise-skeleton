const express = require('express');
const { authenticate } = require('../middlewares/auth');
const { add_product, list_all_products,list_all_reports, delete_product, delete_report, update_report_status } = require('../controllers/agent');
const { validate_add_product_input, validate_delete_product_input, validate_delete_update_report_input } = require('../middlewares/input_validation');

const router = express.Router();


// Routes related to airport agents
// Agent must be authenticated!
    
/* 
    Adding new product to database. 
    @type: POST
    @params:
        -Mandatory
            product_name: String,
            product_category:String
        -Optional:
            product_brand:String,
            product_color:String,
            product_country:String

    return type: success message (with or without possible report matching) 

*/
router.post('/add_product', authenticate, validate_add_product_input, add_product);

/* 
    Listing all products in database
    @type: GET

    return type: JSON with list of products or empty message
*/
router.get('/list_all_products', authenticate, list_all_products)

/* 
    Delete product from database. 
    @type: DELETE
    @params:
        -Mandatory
            product_id: String

    return type: success message 

*/
router.delete('/delete_product', authenticate,validate_delete_product_input, delete_product)

/* 
    Listing all reports in database
    @type: GET

    return type: JSON with list of reports or empty message
*/
router.get('/list_all_reports', authenticate,list_all_reports)

/* 
    Delete report from database. 
    @type: DELETE
    @params:
        -Mandatory
            report_id: String

    return type: success message 

*/
router.delete('/delete_report', authenticate,validate_delete_update_report_input, delete_report)


/* 
    Update report status in database. 
    @type: POST
    @params:
        -Mandatory
            report_id: String

    return type: success message

*/
router.post('/update_report_status', authenticate, validate_delete_update_report_input, update_report_status)

module.exports = router;