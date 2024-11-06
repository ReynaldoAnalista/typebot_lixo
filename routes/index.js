var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/set_data', function(req, res, next) {
  // res.render('index', { title: 'Express' });
});
router.get('/get_data', function(req, res, next) {
  // res.render('index', { title: 'Express' });
});

module.exports = router;
