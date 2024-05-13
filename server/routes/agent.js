const express = require('express');
const { authenticate } = require('../middlewares/auth');
const { add_product, list_all, delete_product, update_product_status } = require('../controllers/agent');
const { validate_add_product_input, validate_delete_and_update_product_input } = require('../middlewares/input_validation');

const router = express.Router();


// Routes related to airport agents
// Agent must be authenticated!
    
/* 
    Adding new product to database. 
    @type: POST
    @params:
        -Mandatory
            product_name: String,
            product_category:String,
            description: String
        -Optional:
            product_brand:String,
            product_color:String,
            product_country:String,
            retrieved: Boolean (automatic if empty),
            status:String (automatic if empty)

    return type: success or error message 

*/
router.post('/add_product', authenticate, validate_add_product_input, add_product);

/* 
    Listing all products in database
    @type: GET

    return type: JSON with list of products or empty message
*/
router.get('/list_all_products', authenticate,list_all)

/* 
    Delete product from database. 
    @type: DELETE
    @params:
        -Mandatory
            product_id: String

    return type: success or error message 

*/
router.delete('/delete_product', authenticate,validate_delete_and_update_product_input, delete_product)

/* 
    Update product status in database. 
    @type: POST
    @params:
        -Mandatory
            product_id: String

    return type: success or error message 

*/
router.post('/update_product_status', authenticate, validate_delete_and_update_product_input, update_product_status)

module.exports = router;