const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const app = require('./app');

console.log(app.get('env')); // returns environment node app is runing in
// console.log(process.env);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`API listening on port ${port}.`);
});