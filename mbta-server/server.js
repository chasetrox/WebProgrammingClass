//Express.js init
var express = require('express');

var cors = require('cors')
var bodyParser = require('body-parser'); // Required if we need to use HTTP query or post parameters
var validator = require('validator'); // See documentation at https://github.com/chriso/validator.js
var app = express();

app.use(cors());
// See https://stackoverflow.com/questions/5710358/how-to-get-post-query-in-express-node-js
app.use(bodyParser.json());
// See https://stackoverflow.com/questions/25471856/express-throws-error-as-body-parser-deprecated-undefined-extended
app.use(bodyParser.urlencoded({ extended: true })); // Required if we need to use HTTP query or post parameters

app.get('/redline.json', function(request, response) {
        
}
