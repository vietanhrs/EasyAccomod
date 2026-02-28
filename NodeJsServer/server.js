require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");

global.__basedir = __dirname;

const app = express();

app.use(helmet());

var corsOptions = {
    origin: process.env.CORS_ORIGIN || "http://localhost:4200",
    credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Server is running" });
});

require("./app/routes/user.routes")(app);
require("./app/routes/account.routes")(app);
require("./app/routes/post.routes")(app);
require("./app/routes/room.routes")(app)
require("./app/routes/comment.routes")(app);
require("./app/routes/report.routes")(app);
require("./app/routes/userFavorite.routes")(app);
require("./app/routes/statistic.routes")(app);
require("./app/routes/notification.routes") (app);
require("./app/routes/extendRequest.routes") (app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
