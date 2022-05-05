const Tour = require('./../models/tourModel');

// convert data to JSON object
// const tours = JSON.parse(
//     fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

/*********** TOUR ROUTE CONTROLLERS **********/

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

exports.createTour = async (req, res) => {
    console.log(req.body);

    try {
        // const newTour = new Tour({});
        // newTour.save(); // calls method on new document

        // Does same thing as above, but calls create method on model itself
        // Save the result of the promise in the newTour variable
        const newTour = await Tour.create(req.body);

        res.status(201).json({
            status: 'Success',
            data: {
                tour: newTour // Promise returned from Tour.create
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'Error',
            message: err,
        });
    }
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