const express = require("express");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");

const notifyRouter = require("./api/notifyRouter");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/notify", notifyRouter);

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// connect template engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(logger(formatsLogger));

app.use((_, res, __) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Use api on routes: /notify",
    data: "Not found",
  });
});

app.use((err, _, res, __) => {
  console.log(err.stack);
  res.status(500).json({
    status: "fail",
    code: 500,
    message: err.message,
    data: "Internal Server Error",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log(`Server running. Use our API on port: ${PORT}`);
});
