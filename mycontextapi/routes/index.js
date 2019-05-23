var express = require('express');
var router = express.Router();
var controller = require('../controllers/User');
var passport = require('passport');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send("HomePage");
});

// router.post('/login', (req, res) => {
//   res.send({ "payload": req.body });
// })

router.post('/register', controller.register);

router.post('/authenticate', controller.authenticate);

router.get('/dashboard', passport.authenticate('jwt', { session: false }), controller.dashboard);

module.exports = router;
