const express = require('express');
const router = express.Router();
const webController = require('../controllers/web.controller');

router.get('/', webController.home);
router.get('/search', webController.search);
router.get('/category/:name', webController.category);

module.exports = router;
