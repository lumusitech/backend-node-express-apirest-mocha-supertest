const express = require("express");
const morgan = require("morgan");

const app = express();
const port = 3000;

app.use(morgan("dev"));
app.use(express.json());
app.use("/users", require("./routes/user.routes"));

app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});

module.exports = app;
