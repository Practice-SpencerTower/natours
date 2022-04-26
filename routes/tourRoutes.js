const express = require('express');
const tourController = require('./../controllers/tourControllers');
const router = express.Router();


router
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.postTour);

router
    .route('/:id')
    .get(tourController.getTour)
    .patch(tourController.patchTour)
    .delete(tourController.deleteTour);

module.exports = router;