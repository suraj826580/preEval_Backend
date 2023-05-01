const express = require("express");
const { connection } = require("./configs/db");
const { teacherRoute } = require("./routes/teacher.route");
const { studentRoute } = require("./routes/studentRoute");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use("/", teacherRoute);
app.use("/student", studentRoute);

app.listen(8080, async () => {
  await connection;
  console.log(`Server is Running on Port num ${process.env.PORT}`);
});
