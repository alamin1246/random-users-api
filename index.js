const express = require("express");
const cors = require("cors");

//app config
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

//create server
app.listen(port, () => console.log(`Listening on Port: ${port}`));

// handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log({
    name: err.name,
    message: err.message,
    stack: err.stack,
  });
  // close server & exit process
  app.close(() => process.exit(1));
});
