const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const searchController = require('../controllers/searchController');


router.get('/', indexController.indexControllerGet);

router.get('/search', searchController.searchControllerGet);


module.exports = router;