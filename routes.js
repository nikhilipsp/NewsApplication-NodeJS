var express = require('express');
var router = express.Router();
const upload = require("./middlewares/upload");
var profileController = require('./controller/ProfileController')
var newsFeedController = require('./controller/NewsFeedController')

router.post('/createProfile/', upload.single("file"), profileController.createProfile);
router.post('/newsFeed/', upload.single("file"), newsFeedController.newsFeed);
router.get('/filterNews/', newsFeedController.filterNews);
router.get('/searchNews/', newsFeedController.searchNews);

module.exports = router;