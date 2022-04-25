const express = require('express');
const morgan = require('morgan');   // logger middleware

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');


const app = express();


/*********** MIDDLEWARE ***********/

app.use(morgan('dev')); // argument will specify the logging format
app.use(express.json()); // middleware - adds body to *request* - need to use becuase out of the box express does not add that body data on the *request* - otherwise req.body will return *undefined*

app.use((req, res, next) => {
    console.log('Hello from the middleware');
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);



// app.get('/api/v1/tours', getAllTours);       // get all tours
// app.post('/api/v1/tours', postTour);         // add new tour
// app.get('/api/v1/tours/:id', getTour);       // get tour
// app.patch('/api/v1/tours/:id', patchTour);   // patch tour
// app.delete('/api/v1/tours/:id', deleteTour); // delete tour

// Mounting a router
// Allows us to separate routers into different files


// app.route('/api/v1/users').get(getAllUsers);

const port = 3000;
app.listen(port, () => {
    console.log(`API listening on port ${port}.`);
});

// Alternate way:
// const port = process.env.PORT || 3000;
// could use logger.info(`API listening on port ${port}`);
