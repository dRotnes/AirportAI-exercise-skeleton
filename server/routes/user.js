const express = require('express');
const { search_by_keyword, search_by_description} = require('../controllers/user')
const { validate_search_by_keyword_input } = require('../middlewares/input_validation');

const router = express.Router();


router.get('/search_by_keyword',validate_search_by_keyword_input, search_by_keyword);
router.get('/search_by_description', search_by_description);

module.exports = router;