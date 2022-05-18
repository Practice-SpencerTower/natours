class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    // TODO: Fix Filter and Sort methods

    // filter() {
    //     const queryObj = {...this.query};
    //     const excludedFields = ['page', 'sort', 'limit', 'fields'];
    //     excludedFields.forEach(el => delete queryObj[el]); // delete excluded fields


    //     // 2) Advanced filtering
    //     let queryStr = JSON.stringify(queryObj);
    //     queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`); // find parameter in query and add $ to convert to mongoose query

    //     this.query = this.query.find(JSON.parse(queryStr));
    //     // let query = Tour.find(JSON.parse(queryStr));
    //     return this;
    // }

    // sort() {
    //     if (this.query.sort) {
    //         const sortBy = this.query.sort.split(',').join(' '); // replace comma with space in sort query
    //         this.query = this.query.sort(sortBy);
    //     } else {
    //         this.query = this.query.sort('-createdAt');
    //     }
    //     return this;
    // }

    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' '); // parse fields from query
            this.query = this.query.select(fields); // projecting = selecting specific field names
        } else {
            this.query = this.query.select('-__v');
        }
        return this;
    }

    paginate() {
        const page = this.queryString.page * 1 || 1;  // define first page by default
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit); // need to skip a certain number of results to get to a specific page
        return this;
    }
}

module.exports = APIFeatures;