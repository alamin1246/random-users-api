const express = require("express");
const cors = require("cors");
const { errorHandler } = require("./middlewares/errorHandler");
const usersRoutes = require("./routes/usersRoutes/users.routes");
const dbConnect = require("./utils/dbConnect");

//app config
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

dbConnect();

//handle application errors
app.use(errorHandler);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Our Successfully Random User Api",
  });
});

// dynamic api routes
app.use("/api/v1", usersRoutes);

//create server
app.listen(port, () => console.log(`Random API on Port: ${port}`));

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
