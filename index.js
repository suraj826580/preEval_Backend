const express = require("express");
const { connection } = require("./configs/db");
const { teacherRoute } = require("./routes/teacher.route");
const { studentRoute } = require("./routes/studentRoute");
require("dotenv").config();

var cors = require("cors");
const app = express();
app.use(cors());

app.use(express.json());

app.use("/", teacherRoute);
app.use("/student", studentRoute);

app.listen(8080, async () => {
  await connection;
  console.log(`Server is Running on Port num ${process.env.PORT}`);
});
