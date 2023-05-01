const { Router } = require("express");
const { TeacherModel } = require("../models/Teacher.models");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const teacherRoute = Router();

teacherRoute.post("/register", async (req, res) => {
  const teacherdata = req.body;

  try {
    bcrypt.hash(teacherdata.password, 5, async (err, hash) => {
      if (hash) {
        const teacher = new TeacherModel({ ...teacherdata, password: hash });
        await teacher.save();
        res.send("Teacher Details is Saved");
      } else {
        res.status(400).send(err);
      }
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

teacherRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (email && password) {
      const teacher = await TeacherModel.findOne({ email });
      if (teacher) {
        bcrypt.compare(password, teacher.password, (err, result) => {
          if (result) {
            const token = jwt.sign({ teacherRelation: teacher._id }, "masai", {
              expiresIn: "1h",
            });
            res.send({ msg: "login Successfull", token: token });
          } else {
            res.send({ msg: "Incorrect Password" });
          }
        });
      } else {
        res.send({ msg: "wrong credentials" });
      }
    } else {
      res.status(400).send({ msg: "email and password must be provided" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = { teacherRoute };
