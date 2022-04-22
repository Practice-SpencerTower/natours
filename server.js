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

// add new tour to route
app.post('/api/v1/tours', (req, res) => {
  console.log(req.body);
  res.json('Post route hit.')
})

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'Success',
    data: {
      tours: tours,
    }
  })
});


const port = 3000;
app.listen(port, () => {
  console.log(`API listening on port ${port}.`);
});

// Alternate way:
// const port = process.env.PORT || 3000;
// could use logger.info(`API listening on port ${port}`);
