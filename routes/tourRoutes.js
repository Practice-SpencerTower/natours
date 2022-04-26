const express = require('express');
const tourController = require('./../controllers/tourControllers');
const router = express.Router();

// search for request id
// val is for the 'id'
router.param('id', tourController.checkID);
// .param('body', tourController.checkBody);

router
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.checkBody, tourController.postTour);

router
    .route('/:id')
    .get(tourController.getTour)
    .patch(tourController.patchTour)
    .delete(tourController.deleteTour);

module.exports = router;