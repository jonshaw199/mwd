const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs");

// Client Routers
const adminClientRouter = require("./routes/adminClient");
const userClientRouter = require("./routes/userClient");

// API Routers
const authRouter = require("./routes/api/auth");
const usersRouter = require("./routes/api/users");
const projectsRouter = require("./routes/api/projects");
const preferencesRouter = require("./routes/api/preferences");
const imagesRouter = require("./routes/api/images");
const validationRouter = require("./routes/api/validation");
const messagesRouter = require("./routes/api/messages");

const app = express();

// First try to use the .env.local file; if one doesnt exist then fall back to the default .env file
const result = dotenv.config({ path: __dirname + "/.env.local" });
if (result.error) {
  dotenv.config();
}

// Dont delete me
require("./utils/mongo");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

if (process.env.NODE_ENV === "production") {
  app.use("/", userClientRouter);
  app.use("/admin", adminClientRouter);
}

// API Routes
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/projects", projectsRouter);
app.use("/preferences", preferencesRouter);
app.use("/images", imagesRouter);
app.use("/validation", validationRouter);
app.use("/messages", messagesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
