const express = require('express');
const connectDB = require("./config/db")

const app = express();

//DB Connection
connectDB();

//Initializing Middleware
app.use(express.json({extended: false}));

app.get('/', (req, res) => res.json({msg: "ContactKeeper API"}))


//Routes
app.use("/api/users", require("./routes/users"))
app.use("/api/contacts", require("./routes/contacts"))
app.use("/api/auth", require("./routes/auth"))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`SERVER STARTED, PORT: ${PORT}`))