const express = require("express");

const { globalErrorHandler } = require("./controllers/errors.controller");

const { users } = require("./routers/users");
const { repairs } = require("./routers/repairs");

const app = express();

app.use(express.json());

app.use("/api/v1/users", users);
app.use("/api/v1/repairs", repairs);

app.use("*", globalErrorHandler);

module.exports = { app };
