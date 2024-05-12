const express = require('express');
const { authenticate } = require('../middlewares/auth');

const router = express.Router();

router.get('/create', authenticate, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}` });
});

router.get('/delete', authenticate, (req, res) => {
    res.json({ message: `Welcome ${req.user.username}` });
});

router.get('/list', authenticate, (req, res) => {
    res.json({ message: `Welcome ${req.user.username}` });
});

module.exports = router;