const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require('express-fileupload');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoute");
const errorHandler = require("./middleware/errorMiddleware");


mongoose.set('strictQuery', true); // Suppress the warning and maintain current behavior

const app = express();

//MiddleWares
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
app.use(express.urlencoded({extended : false}));


app.use(cors({
  origin: 'http://localhost:4200', // Allow only this origin to access
  credentials: true, // Allow cookies to be sent
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS','PATCH'], // Specify methods to allow
  allowedHeaders: ['Content-Type', 'Authorization'] // Specify headers to allow
}));

//Routes
app.use("/api", userRoute);

app.get("/", (req, res) => {
  res.send("Home Page...");
});


//Error middleware
app.use(errorHandler)
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI2)
  .then(() => {
    app.listen(PORT, ()=> {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err))

