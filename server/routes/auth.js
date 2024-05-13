const express = require('express');
const { register, login } = require('../controllers/auth');
const { validate_register_input } = require('../middlewares/input_validation');

const router = express.Router();

router.post('/register', validate_register_input, register);
router.post('/login', login);

module.exports = router;