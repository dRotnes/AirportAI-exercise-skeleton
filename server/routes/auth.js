const express = require('express');
const { register, login } = require('../controllers/auth');
const { validate_register_input } = require('../middlewares/input_validation');

const router = express.Router();

/* 
    Register new user to database. 
    @type: POST
    @params:
        -Mandatory
            username: String,
            email:String,
            password: String
        -Optional:
            role:String (admin or user)

    return type: success message

*/
router.post('/register', validate_register_input, register);

/* 
    Login user
    @type: POST
    @params:
        -Mandatory
            username: String,
            password: String

    return type: JWT token

*/
router.post('/login', login);

module.exports = router;