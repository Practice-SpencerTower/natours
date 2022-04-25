const fs = require('fs');
const express = require('express');
const { nanoid } = require('nanoid');

const router = express.Router();


/*********** USER ROUTE HANDLERS ***********/

const getAllUsers = (req, res) => {
    if (!users.length) {
        res.status(404).json({
            status: 'Error',
            requestTime: req.requestTime,
        });
    };

    res.status(200).json({
        status: 'Success',
        requestTime: req.requestTime,
        data: {
            users: users,
        }
    });
};

const getUser = (req, res) => {
    const id = req.params.id;

    let userData;
    for (const user of users) {
        if (user._id === id) {
            userData = user;
            res.status(200).json({
                status: 'Success',
                requestTime: req.requestTime,
                data: {
                    user: userData,
                }
            });
        };
    };
    if (!userData) {
        res.status(404).json({
            status: 'Fail',
            requestTime: req.requestTime,
        });
    };
};

const createUser = (req, res) => {
    const newId = nanoid();
    const newUser = Object.assign({ id: newId }, req.body);
    users.push(newUser);

    fs.writeFile(`../dev-data/data/users.json`,
        JSON.stringify(users),
        err => {
            res.status(201).json({
                status: 'Success',
                data: {
                    user: newUser
                }
            });
        }
    );
};

const patchUser = (req, res) => {
    const id = req.params.id;
    let userData;
    for (const user of users) {
        if (user._id === id) {
            userData = user;
            res.status(200).json({
                status: 'Success',
                requestTime: req.requestTime,
                data: {
                    user: userData,
                }
            });
        };
    };
    if (!userData) {
        res.status(404).json({
            status: 'Fail',
            requestTime: req.requestTime,
        });
    };
}


/*********** USER ROUTES ***********/

router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

router
    .route('/:id')
    .get(getUser)
    .patch(patchUser)
//   .delete(deleteUser);

module.exports = router;