const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const feedRoutes = require("./routes/feed");
const authRoutes = require("./routes/auth");
const studentRoutes = require("./routes/student");
const collegeRoutes = require("./routes/college");
const detailsRoutes = require("./routes/extraDetails")


const app = express();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + "-" + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
app.use(cookieParser());
app.use(
    multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use("/images", express.static(path.join(__dirname, "images")));
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
app.use("/feed", feedRoutes);
app.use("/auth", authRoutes);
app.use("/college", detailsRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

app.use(express.static("client/build"));

app.use((req, res) => {
    res.sendFile(`${__dirname}/client/build/index.html`);
});

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