const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const tasksRouter = require("./routes/tasks.routes");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(tasksRouter);
app.use((err, req, res, next) => {
  return res.json({
    message: err.message,
  });
});

app.listen(4000);
