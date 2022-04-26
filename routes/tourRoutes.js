const express = require('express');
const tourController = require('./../controllers/tourControllers');
const router = express.Router();

// search for request id
// val is for the 'id'
router.param('id', (req, res, next, val) => {
    console.log(`Tour id is: ${val}`);
    next();
});

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