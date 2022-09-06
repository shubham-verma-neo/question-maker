const express = require('express');
const app = express();

require('./startup/mongodb')()
require('./startup/routes')(app, express);



const port = 8000;
app.listen(port, () => {
    console.log(`connected to port ${port}...`);
});