const express = require('express');
const { search_by_keyword, search_by_description, report_loss} = require('../controllers/user')
const { validate_search_by_keyword_input, validate_search_by_description_input, validate_loss_report_input } = require('../middlewares/input_validation');

const router = express.Router();

/* 
    Add new loss report. 
    @type: POST
    @params:
        -Mandatory
            name String
            last_name String
            nationality String
            document_number String
            contact String
            email String
            address String
            loss_description String
            loss_time String

    return type: success message and report structure

*/
router.post('/report_loss', validate_loss_report_input,report_loss);

/* 
    Search product by keyword. 
    @type: GET
    @params:
        -Mandatory
            keyword String
        -Optional
            date Date

    return type: success message and report structure

*/
router.get('/search_by_keyword',validate_search_by_keyword_input, search_by_keyword);

/* 
    Search product by description. 
    @type: GET
    @params:
        -Mandatory
            description String
        -Optional
            date Date

    return type: success message and report structure

*/
router.get('/search_by_description',validate_search_by_description_input, search_by_description);


module.exports = router;