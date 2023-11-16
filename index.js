const express = require("express");
const morgan = require("morgan");
const createError = require("http-errors");
require("dotenv").config();

const authRouter = require("./routers/authRoute");
const connectDB = require("./config/dbConfig");
const { verifyAccessToken } = require("./utils/jwt_utils");

const app = express();
connectDB();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", verifyAccessToken, async (req, res, next) => {
  res.send("hello from express");
});
app.use("/auth", authRouter);

app.use(async (req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
  //   next(createError.NotFound("This route does not exist"));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      stat: err.status || 500,
      message: err.message,
    },
  });
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`server is running on port:${port}`);
});
