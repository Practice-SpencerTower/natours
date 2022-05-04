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
    useFindAndModify: false
})
    .then(() => console.log('DB Connection Successful.'));

console.log(app.get('env')); // returns environment node app is runing in
// console.log(process.env);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`API listening on port ${port}.`);
});