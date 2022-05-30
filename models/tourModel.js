const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name'], // validator, checks if name is there
        unique: true,
        trim: true,
        maxlength: [40, 'A tour name must have less or equal than 40 characters'],
        minlength: [10, 'A tour name must have at least 10 characters'],
        validate: validator.isAlpha,
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
        enum: { 
            values: ['easy, medium, hard'],
            message: 'Difficulty must be either: easy, medium, hard', 
        },
    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0'],
    },
    ratingsQuantity: {
        type: Number,
        default: 0,
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price']
    },
    priceDiscount: {
        type: Number,
        // function will have access to the price discount input
        validate: {
            function(value) { 
                return value < this.price; // 'this' will only point to documment when you are creating a NEW document - eg it wont work with 'update'
        },
        message: 'Discount price ({VALUE}) should be below regular price'
        }   
    },
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
    // console.log('THIS', this);
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
    console.log('TOURSCHEMA PRE MIDDLEWARE HIT');
    this.find({ secretTour: {$ne: true}});

    this.start = Date.now();
    next();
});

tourSchema.post(/^find/, function(docs, next) {
    console.log(`Query took ${Date.now() - this.start} milliseconds`);
    // console.log(docs);
    next();
});

// AGGREGATION MIDDLEWARE
tourSchema.pre('aggregate', function(next) {
    this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
    next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;