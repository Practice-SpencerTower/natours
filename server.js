const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' }); // needs to be above app so app has access to it
const app = require('./app');


const DB = process.env.DATABASE.replace(
    '<PASSWORD>', process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
})
    .then(() => console.log('DB Connection Successful'));


console.log(app.get('env')); // returns environment node app is runing in
// console.log(process.env);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`API listening on port ${port}.`);
});