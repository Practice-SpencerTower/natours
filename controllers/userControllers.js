const fs = require('fs');
const { nanoid } = require('nanoid');


const users = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);

/*********** USER ROUTE CONTROLLERS ***********/

exports.getAllUsers = (req, res) => {
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

exports.getUser = (req, res) => {
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

exports.createUser = (req, res) => {
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

exports.patchUser = (req, res) => {
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