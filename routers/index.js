const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home')

router.get('/', homeController.getIndex)
router.get('/search/:term', homeController.findUsername)
router.get('/deleteUsernames', homeController.deleteAllUsernames)

module.exports = router;
