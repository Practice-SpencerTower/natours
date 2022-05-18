const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name'], // validator, checks if name is there
        unique: true,
        trim: true,
    },
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
}, { // schema options
    toJSON: { virtuals: true},
    toObject: { virtuals: true},
});

tourSchema.virtual('durationWeeks').get(function() {
    return this.durations / 7; // convert days to weeks
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;