const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const mongoSanitize = require('express-mongo-sanitize')

const authRoutes = require("./routes/auth")
const activityRoutes = require("./routes/activities")
const runDataRoutes = require("./routes/datasets")


const app = express();

const port = 3000;

/* call and use relevant middleware
 */
// call cors module - to stop cross origin resource sharing errors from the client
// side
app.use(
  cors({
    credentials: true,
      // credentials: true, // allows cookies to be sent to client
  })
);



// call mongoose to connect to mongodb database
mongoose.connect(process.env.DB_CONNECTOR)
.then(() => console.log('Connected to database successfully'))

app.use(cookieParser());

app.use(mongoSanitize());

// app.use(express.json());

app.use(bodyParser.json())


app.use('/api/auth', authRoutes)

app.use('/api/user', activityRoutes)

app.use('/api/data', runDataRoutes)

app.get("/api", (req, res) => {
  res.send({success: "Strava app is running succesfully!"});
});


app.use((req, res) => {
  return res.status(404).json({ error: 'API endpoint not found' });  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
