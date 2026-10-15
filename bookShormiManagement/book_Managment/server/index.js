const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Dotenv load kora

const connectDB = require("./config/db");

// Database connect call
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use('/', require("./routes/BooksRoute"));

app.get('/', (req, res) => {
    res.send("server running");
});

// Port dynamic kora holo (.env theke nibe, ba default 5000)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});