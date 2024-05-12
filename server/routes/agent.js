const express = require('express');
const { authenticate } = require('../middlewares/auth');
const { add_product, list_all, delete_product, update_product_status } = require('../controllers/agent');

const router = express.Router();


// Routes related to airport agents
// Agent must be authenticated!
    
/* 
    Adding new product to database. 
    @type: POST
    @params:
        -Mandatory
            product_name: String,
            added_by: String,
            description: String
        -Optional:
            retrieved: Boolean,
            retrieval_date: Date

    return type: success or error message 

*/
router.post('/add_product', authenticate, add_product);

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
router.delete('/delete_product', authenticate, delete_product)

/* 
    Update product status in database. 
    @type: POST
    @params:
        -Mandatory
            product_id: String

    return type: success or error message 

*/
router.post('/update_product_status', authenticate, update_product_status)

module.exports = router;