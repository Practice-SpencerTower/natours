const express = require('express');
const tourController = require('./../controllers/tourControllers');
const router = express.Router();

// search for request id
// val is for the 'id'
// router.param('id', tourController.checkID);

// Alias for top 5 cheap tours

router
    .route('/top-5-cheap')
    .get(tourController.aliasTopCheapTours, tourController.getAllTours);

router
    .route('/tour-stats')
    .get(tourController.getTourStats);

router
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.createTour);

router
    .route('/:id')
    .get(tourController.getTour)
    .patch(tourController.patchTour)
    .delete(tourController.deleteTour);

module.exports = router;