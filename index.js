const express = require("express");
const app = express();
const routesAdmin = require('./routes/admin');
const routesEmployee = require('./routes/employee')
const routesMission = require('./routes/mission')
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require("body-parser");

require('./database/connect');



const port = process.env.PORT || 8000;

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use("/api", routesAdmin);
app.use("/api", routesEmployee);
app.use("/api", routesMission);
app.listen(port, () => console.log('Server app listening on port ' + port));
