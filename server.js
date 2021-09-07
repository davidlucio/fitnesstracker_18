const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));

// Front-end
app.use(express.static("public"));

// DB Connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

// Routes
app.use(require("./routes/"));

// Listener / Start Server
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});
