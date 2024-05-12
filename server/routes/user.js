const express = require('express');
const { authenticate } = require('../middlewares/auth');

const router = express.Router();

router.get('/search', (req, res) => {
  res.json({ message: `Welcome` });
});

module.exports = router;