var router = require('express').Router();
const patientController = require('./../controllers/patientController');
const jwtAuth = require('../middlewares/jwtAuth');

router.post('/', [jwtAuth], patientController.create);
router.get('/', [jwtAuth], patientController.get);

module.exports = router;
