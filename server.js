const express = require('express');

const app = express();

app.get('/', (req, res) => {

});


const port = 3000;
app.listen(port, () => {
  console.log(`API listening on port ${port}.`);
});

// Alternate way:
// const port = process.env.PORT || 3000;
// could use logger.info(`API listening on port ${port}`);
