const express = require('express');
const userController = require('./../controllers/userControllers');
const router = express.Router();

/*********** USER ROUTES ***********/

router
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser);

router
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.patchUser)
//   .delete(deleteUser);

module.exports = router;