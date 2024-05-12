const express = require('express');
const { search_by_keyword } = require('../controllers/user')
const router = express.Router();


router.get('/search_by_keyword', search_by_keyword);

module.exports = router;