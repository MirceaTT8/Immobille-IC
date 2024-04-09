const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoute");
const errorHandler = require("./middleware/errorMiddleware");

mongoose.set('strictQuery', true); // Suppress the warning and maintain current behavior

const app = express();

//MiddleWares
app.use(express.json());
app.use(cookieParser());
app.use('/api', userRoute); // mounting the router on the /api path
app.use(express.urlencoded({extended : false}));
app.use(cors({
    origin: ["http://localhost:3001", "https://Bakemehappy.vercel.app"],
    credentials: true,
    }));

//Routes
app.use("/api/users", userRoute);

app.get("/", (req, res) => {
    res.send("Home Page...");
});


//Error middleware
app.use(errorHandler)
const PORT = process.env.PORT || 5000;
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, ()=> {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => console.log(err))

