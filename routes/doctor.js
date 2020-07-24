var router = require('express').Router();
const doctorController = require('./../controllers/doctorController');
const jwtAuth = require('../middlewares/jwtAuth');

router.post('/', [jwtAuth], doctorController.create);
router.get('/', [jwtAuth], doctorController.get);

module.exports = router;
