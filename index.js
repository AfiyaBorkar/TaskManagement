const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require('path');
const cors = require("cors");
const mongoose = require("mongoose");
dotenv.config();
const userRoutes = require('./routes/UserRoutes')
const taskRoutes = require('./routes/TaskRoutes')

app.use(cors());
app.use(express.json());
app.use('/api/user',userRoutes)
app.use('/api/tasks',taskRoutes)
const port = process.env.PORT || 5000;
app.use(express.static(path.resolve(__dirname, './taskmanagement/build')));


const connectDb = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("DB Server got connected");
    } catch (err) {
      console.log(`DB Server got error ${err.message}`);
    }
  };
  
  connectDb();

  // app.get("/", (req, res) => {
  //   res.send("App is running");
  // });
  
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './taskmanagement/build/index.html'));
  });
  
  // Create HTTP server

// Start the server
app.listen(port, () => {
    console.log(`App is listening on port no ${port}`);
});