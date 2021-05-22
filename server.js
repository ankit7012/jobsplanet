const express = require('express');

// Middleware is a software that acts as an intermediary between 
// two applications or services to facilitate their communication.
// body-parser gets data from body
const bodyParser = require('body-parser');

// cross origin resource sharing: enables scripts running on a 
// browser client to interact with resources from a different origin/domain
// which is otherwise blocked by same origin policy for Js
const cors = require('cors');

// mongoose: Object Data Modeling (ODM) library for MongoDB and Node.js
// manages relationships between data, provides schema validation, 
// translate between objects in code and the representation of those objects in MongoDB
const mongoose = require('mongoose');

const passport = require("passport");

const app = express();

const PORT = process.env.PORT || 4000;
const DB_NAME = "JobsPlanet"

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

// routes
var testAPIRouter = require("./routes/testAPI");
var UserRouter = require("./routes/users.routes");
var JobRouter = require("./routes/job.routes");
var ApplicationRouter = require("./routes/application.routes");

app.use(cors());
// Body-Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const connection_url = 'mongodb+srv://Ankit7012:Ankit7012@cluster0.vuhf5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
// Connect to MongoDB
// const connection_url = 'mongodb+srv://admin-darpan:Darpan786@cluster0.uqvch.mongodb.net/tiktok?retryWrites=true&w=majority';

// To localhost
mongoose.connect(connection_url, { useNewUrlParser: true,useUnifiedTopology:true,
    useCreateIndex:true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully !");
})


// setup API endpoints
app.use("/testAPI", testAPIRouter);
app.use("/user", UserRouter);
app.use("/job", JobRouter);
app.use("/application", ApplicationRouter);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
