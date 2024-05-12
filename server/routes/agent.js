const express = require('express');
const { authenticate } = require('../middlewares/auth');
const { add_product, list_all } = require('../controllers/agent');

const router = express.Router();

router.post('/add_product', authenticate, add_product);

router.get('/list_products', authenticate,list_all)

router.get('/delete_product', authenticate, (req, res) => {
    res.json({ message: `Welcome ${req.user.username}` });
});


module.exports = router;