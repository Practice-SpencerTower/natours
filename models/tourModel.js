const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name'], // validator, checks if name is there
        unique: true,
        trim: true,
    },
    slug: String,
    duration: {
        type: Number,
        required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'A tour must have a group size'],
    },
    difficulty: {
        type: String,
        required: [true, 'A tour must have a difficulty'],
    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
    },
    ratingsQuantity: {
        type: Number,
        default: 0,
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price']
    },
    priceDiscount: Number,
    summary: {
        type: String,
        trim: true, // only works for strings - removes all white space in beginning and end of string
        required: [true, 'A tour must have a description'],
    },
    description: {
        type: String,
        trim: true,
    },
    imageCover: {
        type: String,
        required: [true, 'A tour must have a cover image'],
    },
    images: [String], // takes images in as an array of strings
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false,
    },
    startDates: [Date], // array of dates
    secretTour: {
        type: Boolean,
        default: false,
    },
}, { // schema options
    toJSON: { virtuals: true},
    toObject: { virtuals: true},
});

tourSchema.virtual('durationWeeks').get(function() {
    return this.durations / 7; // convert days to weeks
});

// DOCUMENT MIDDLEWARE
// in save middleware, 'this' points to document that is being saved
tourSchema.pre('save', function(next) {
    console.log('THIS', this);
    this.slug = slugify(this.name, { lower: true });
    next();
});

// tourSchema.pre('save', function(next) {
//     console.log('Will save document...');
//     next();
// });

// tourSchema.post('save', function(doc, next) {
//     console.log('DOC', doc);
//     next();
// });

// QUERY MIDDLEWARE
// search all strings that start with 'find'
tourSchema.pre(/^find/, function(next) { 
    this.find({ secretTour: {$ne: true}});

    this.start = Date.now();
    next();
});

tourSchema.post(/^find/, function(docs, next) {
    console.log(`Query took ${Date.now() - this.start} milliseconds`);
    console.log(docs);
    next();
})

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;