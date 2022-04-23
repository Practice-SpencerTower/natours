const fs = require('fs');

const express = require('express');

const app = express();

// add JSON to request
app.use(express.json()); // middleware - adds body to *request* - need to use becuase out of the box express does not add that body data on the *request* - otherwise req.body will return *undefined*

// app.get('/', (req, res) => {
//   res.status(200).json({
//     message: 'Hello from the server side!',
//     app: 'Natours'
//   })
// });

// app.post('/', (req, res) => {
//   res.status(200).send('You can post to this endpoint.');
// });

// convert data to JSON object
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);


app.get('/api/v1/tours', getAllTours);       // get all tours
app.post('/api/v1/tours', postTour);         // add new tour
app.get('/api/v1/tours/:id', getTour);       // get tour
app.patch('/api/v1/tours/:id', patchTour);   // patch tour
app.delete('/api/v1/tours/:id', deleteTour); // delete tour


const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'Success',
    data: {
      tours: tours,
    }
  });
};

const postTour = (req, res) => {
  console.log(req.body);
  // get last tour, get its id, add 1 to create new tour id
  const newId = tours[tours.length - 1].id + 1;
  // combine id with new tour object
  const newTour = Object.assign({ id: newId }, req.body);

  console.log('TOURS BEFORE PUSH', tours);
  tours.push(newTour);
  console.log('TOURS AFTER PUSH', tours); // add new tour object to tours array
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      res.status(201).json({
        status: 'Success',
        data: {
          tour: newTour
        }
      });
    });
};

const getTour = (req, res) => {
  console.log(req.params);
  // set id to req id and multiply by 1 to turn its type from string to number
  const id = req.params.id * 1;

  // check if matching id in tours
  const tour = tours.find(elem => elem.id === id);
  if (tour) {
    res.status(200).json({
      status: 'Success',
      data: {
        tour: tour,
      }
    });
  } else {
    res.status(404).json('Tour not found.');
  }
};

const patchTour = (req, res) => {
  // check if id exists, if not send 404
  if (req.params.id * 1 > tours.length) {
    res.status(404).json({
      status: 'Fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'Success',
    data: {
      tour: '<Updated tour placeholder>'
    }
  });
};


const deleteTour = (req, res) => {
  // check if id exists, if not send 404
  if (req.params.id * 1 > tours.length) {
    res.status(404).json({
      status: 'Fail',
      message: 'Invalid ID',
    });
  }
  res.status(204).json({
    status: 'Success',
    data: null,
  });
};


const port = 3000;
app.listen(port, () => {
  console.log(`API listening on port ${port}.`);
});

// Alternate way:
// const port = process.env.PORT || 3000;
// could use logger.info(`API listening on port ${port}`);
