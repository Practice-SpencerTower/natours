const Tour = require('./../models/tourModel');

// convert data to JSON object
// const tours = JSON.parse(
//     fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

/*********** TOUR ROUTE CONTROLLERS **********/

exports.getAllTours = async (req, res) => {
    console.log('Get All Tours Route Hit.');

    try {
        // BUILD QUERY
        // 1) Filtering
        const queryObj = {...req.query};
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]); // delete excluded fields


        // 2) Advanced filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`); // find parameter in query and add $ to convert to mongoose query
        console.log(JSON.parse(queryStr));


        let query = Tour.find(JSON.parse(queryStr));


        console.log('REQ.QUERY', req.query);
        console.log('REQ QUERY TYPE: ', typeof req.query);
        console.log('REQ QUERY SORT: ', req.query.sort)
        // 2) Sorting
        if (req.query.sort) {
            query = query.sort(req.query.sort);
            // sort('price')
        }

        // EXECUTE QUERY
        const tours = await query;

        // SEND RESPONSE
        res.status(200).json({
            status: 'Success',
            requestTime: req.requestTime,
            data: {
                tours: tours,
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'Error',
            message: err
        });
    }
};

exports.getTour = async (req, res) => {
    console.log(req.params.id);
    const id = req.params.id;

    try {
        const tour = await Tour.findById(id);
        // Same as Tour.findOne({ _id: req.params.id })
        res.status(200).json({
            status: 'Success',
            data: {
                tour: tour,
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'Error',
            message: err
        });
    }
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

exports.patchTour = async (req, res) => {
    try {
        const id = req.params.id;
        const tour = await Tour.findByIdAndUpdate(id, req.body, {
            new: true, // new updated document will be the one returned in the promise
            runValidators: true, // validates the update operation against the model's schema
        }); 
        res.status(200).json({
            status: 'Success',
            data: {
                tour: tour,
            }
        });
    } catch(err) {
        console.log(err);
        res.status(404).json({
            status: 'Error',
            message: err,
        })
    }
};

exports.deleteTour = async (req, res) => {
    // check if id exists, if not send 404
    try {
        const id = req.params.id;
        const tour = await Tour.findByIdAndDelete(id);
        console.log('DELETE', tour);
        res.status(204).json({
            status: 'Success',
            data: null,
        });
    } catch (err) {
        res.status(404).json({
            status: 'Error',
            message: err,
        })
    }
};