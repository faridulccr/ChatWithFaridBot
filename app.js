const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
app.use(cors()); // for any cross-origin (universal)
// app.use(express.static());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// declare static folder
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// not found route handler
app.use((req, res, next) => {
    res.status(404).json({
        message: "page not fond",
    });
});

// server error handling
app.use((err, req, res, next) => {
    res.status(500).json({
        message: err,
    });
});

module.exports = app;
