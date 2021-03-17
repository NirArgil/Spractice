// server
const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");

const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

app.use(express.json());

// app.use(bodyParser.json());

// Connect the Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/transaction", require("./routes/api/transactions"));

// const transactions = require('./routes/api/transactions');

// app.use('/api/transaction', transactions);

// Serve Static Assets in Production
if (process.env.NODE_ENV === "production") {
  // Set Static Folder
  app.use(express.static("client/build"));
  
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}



app.listen(PORT, () => console.log(`The magic happens on port ${PORT}`));