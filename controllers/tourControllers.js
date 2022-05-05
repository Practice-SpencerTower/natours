const Tour = require('./../models/tourModel');

// convert data to JSON object
// const tours = JSON.parse(
//     fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

/*********** TOUR ROUTE CONTROLLERS **********/

exports.checkBody = (req, res, next) => {
    const body = req.body;
    // verify that body contains name and price
    if (!body.name || !body.price) {
        return res.status(404).json({
            status: 'Fail',
            message: 'No request data',
        });
    };
    next();
};

exports.getAllTours = (req, res) => {
    console.log('Get All Tours Route Hit.');
    res.status(200).json({
        status: 'Success',
        // requestTime: req.requestTime,
        // data: {
        //     tours: tours,
        // }
    });
};

exports.postTour = (req, res) => {
    console.log(req.body);
    // get last tour, get its id, add 1 to create new tour id
    // const newId = tours[tours.length - 1].id + 1;
    // combine id with new tour object
    // const newTour = Object.assign({ id: newId }, req.body);

    // tours.push(newTour);

    // fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`,
    //     JSON.stringify(tours),
    //     err => {
    //         res.status(201).json({
    //             status: 'Success',
    //             data: {
    //                 tour: newTour
    //             }
    //         });
    //     });
};

exports.getTour = (req, res) => {
    console.log(req.params);
    // set id to req id and multiply by 1 to turn its type from string to number
    const id = req.params.id * 1;

    // check if matching id in tours
    // const tour = tours.find(elem => elem.id === id);
    // if (tour) {
    //     res.status(200).json({
    //         status: 'Success',
    //         data: {
    //             tour: tour,
    //         }
    //     });
    // };
};

exports.patchTour = (req, res) => {
    // check if id exists, if not send 404
    res.status(200).json({
        status: 'Success',
        data: {
            tour: '<Updated tour placeholder>',
        }
    });
};

exports.deleteTour = (req, res) => {
    // check if id exists, if not send 404
    res.status(204).json({
        status: 'Success',
        data: null,
    });
};