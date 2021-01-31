const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const studentRoutes = require("./routes/student");
const collegeRoutes = require("./routes/college");
const detailsRoutes = require("./routes/extraDetails")
const acadDetailsRoutes = require("./routes/acadDetails")
const moneyDetailsRoutes = require("./routes/moneyDetails")

const app = express();


// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
app.use(cookieParser());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.use("/", collegeRoutes);
app.use("/college", studentRoutes);
app.use("/auth", authRoutes);
app.use("/college", detailsRoutes);
app.use("/admin", require('./routes/admin'));
app.use("/college", acadDetailsRoutes);
app.use("/college", moneyDetailsRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

// app.use(express.static("client/build"));

// app.use((req, res) => {
//     res.sendFile(`${__dirname}/client/build/index.html`);
// });

mongoose
    .connect("mongodb://localhost:27017/hackhaton", {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then((result) => {
        console.log("Database connected");
        app.listen(8080);
    })
    .catch((err) => console.log(err));