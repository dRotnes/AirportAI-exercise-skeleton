const express = require('express');
const { search_by_keyword, search_by_description, report_loss} = require('../controllers/user')
const { validate_search_by_keyword_input, validate_search_by_description_input, validate_loss_report_input } = require('../middlewares/input_validation');

const router = express.Router();


router.get('/search_by_keyword',validate_search_by_keyword_input, search_by_keyword);
router.get('/search_by_description',validate_search_by_description_input, search_by_description);
router.post('/report_loss', validate_loss_report_input,report_loss);


module.exports = router;