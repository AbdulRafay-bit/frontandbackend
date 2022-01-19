const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const auth= require("./routes/authRoutes")
const passportConfig = require("./lib/passportConfig");
const cors = require("cors");
const fs = require("fs");

mongoose
  .connect("mongodb+srv://rafay1234:rafay1234@cluster0.wdmlg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then((res) => console.log("Connected to DB"))
  .catch((err) => console.log(err));

// initialising directories
if (!fs.existsSync("./public")) {
  fs.mkdirSync("./public");
}
if (!fs.existsSync("./public/resume")) {
  fs.mkdirSync("./public/resume");
}
if (!fs.existsSync("./public/profile")) {
  fs.mkdirSync("./public/profile");
}
const app=express()
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
 
app.use(express.json())

// Setting up middlewares
app.use(cors());
app.use(express.json());
app.use(passportConfig.initialize());

// Routing
app.use("/api", require("./routes/apiRoutes"));
app.use("/auth",auth);
app.use("/upload", require("./routes/uploadRoutes"));
app.use("/host", require("./routes/downloadRoutes"));
app.get('/',(req,res)=>{
    res.send("App is running...")
})



app.listen(5000,console.log('Server running on port 5000'))