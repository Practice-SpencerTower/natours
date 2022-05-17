const Tour = require('./../models/tourModel');

// pre-fill query string for user for alias
exports.aliasTopCheapTours = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fileds = 'name,price,ratingsAverage,summary,difficulty';
    next();
};

class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filter() {
        const queryObj = {...this.query};
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]); // delete excluded fields


        // 2) Advanced filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`); // find parameter in query and add $ to convert to mongoose query

        this.query.find(JSON.parse(queryStr));
        // let query = Tour.find(JSON.parse(queryStr));
    }

    sort() {
        
    }
}

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
        // const queryObj = {...req.query};
        // const excludedFields = ['page', 'sort', 'limit', 'fields'];
        // excludedFields.forEach(el => delete queryObj[el]); // delete excluded fields


        // // 2) Advanced filtering
        // let queryStr = JSON.stringify(queryObj);
        // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        // console.log(JSON.parse(queryStr));


        // let query = Tour.find(JSON.parse(queryStr));


        console.log('REQ.QUERY', req.query);
        console.log('REQ QUERY TYPE: ', typeof req.query);
        console.log('REQ QUERY SORT: ', req.query.sort);
        // 2) Sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' '); // replace comma with space in sort query
            query = query.sort(req.query.sort);
        } else {
            query = query.sort('-createdAt');
        }

        // 3) Field limiting
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' '); // parse fields from query
            query = query.select(fields); // projecting = selecting specific field names
        } else {
            query = query.select('-__v');
        }

        // 4) Pagination
        const page = req.query.page * 1 || 1;  // define first page by default
        const limit = req.query.limit * 1 || 100;
        const skip = (page - 1) * limit;
        // page=2&limit=10, 1-10, page 1, 11-20, page 2, 21-30, page 3
        query = query.skip(skip).limit(limit); // need to skip a certain number of results to get to a specific page

        if (req.query.page) {
            const numTours = await Tour.countDocuments();
            if (skip >= numTours) throw new Error('This page does not exist.');  // throw new error will automatically trigger catch block
        }
        // EXECUTE QUERY
        const features = new APIFeatures(Tour.find(), req.query).filter();
        const tours = await features.query;

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