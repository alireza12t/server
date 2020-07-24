var router = require('express').Router();
const requestController = require('./../controllers/requestController');
const jwtAuth = require('../middlewares/jwtAuth');

router.post('/', [jwtAuth], requestController.create);
router.get('/doctor', [jwtAuth], requestController.getDoctorRequests);
router.get('/patient', [jwtAuth], requestController.getPatientRequests);

router.delete('/:id/cancel', [jwtAuth], requestController.cancelRequest);
router.put('/:id/reject', [jwtAuth], requestController.rejectRequest);
router.put('/:id/accept', [jwtAuth], requestController.acceptRequest);

module.exports = router;
