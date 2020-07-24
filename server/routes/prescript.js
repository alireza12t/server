var router = require('express').Router();
const prescriptController = require('./../controllers/prescriptController');
const jwtAuth = require('../middlewares/jwtAuth');

router.post('/', [jwtAuth], prescriptController.create);
router.get('/', [jwtAuth], prescriptController.get);

module.exports = router;
