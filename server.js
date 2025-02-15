const express = require("express");
const morgan = require("morgan")
const cors = require("cors");
const connectDB = require("./config/db");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 9777;

// database connection
connectDB();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// routes
app.use('/api/v1/test', require("./routes/testRoutes"));
app.use('/api/v1/auth', require("./routes/authRoutes"));
app.use('/api/v1/user', require("./routes/userRoutes"));
app.use('/api/v1/restaurant', require("./routes/restaurantRoutes"));
app.use('/api/v1/category', require("./routes/categoryRoutes"));
app.use('/api/v1/food', require("./routes/foodRoutes"));

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});