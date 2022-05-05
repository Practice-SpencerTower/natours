const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './.env' });

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


const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name'], // validator, checks if name is there
        unique: true
    },
    rating: {
        type: Number,
        default: 4.5
    },
    price: {
        type: Number,
        required: true
    }
});

const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
    name: '',
    price: 997,
});

// Saves testTour to tours collection in db
// .save() returns a promise (final document after being saved in db)- can consume with .then() and catch error if one occurs while trying to save to db
testTour.save().then(doc => {
    console.log('DOC: ', doc);
}).catch(err => {
    console.log('ERROR: ', err);
})


console.log(app.get('env')); // returns environment node app is runing in
// console.log(process.env);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`API listening on port ${port}.`);
});