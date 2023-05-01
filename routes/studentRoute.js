const { Router } = require("express");
const { auth } = require("../middleware/auth.middleware");
const { StudentModel } = require("../models/Student.Model");

const studentRoute = Router();

// get the students Data of the teacher

studentRoute.get("/", auth, async (req, res) => {
  try {
    const students = await StudentModel.find({
      teacherRelation: req.body.teacherRelation,
    });
    res.send(students);
  } catch (error) {
    res.send({ msg: error });
  }
});

// post the students Data of the teacher

// ------------------------------------------------

studentRoute.post("/", auth, async (req, res) => {
  const data = req.body;
  try {
    const student = new StudentModel(data);
    await student.save();
    res.send({ msg: "student has been Updated" });
  } catch (error) {
    res.send({ msg: error });
  }
});
studentRoute.delete("/delete/:id", auth, async (req, res) => {
  const { id } = req.params;
  const student = await StudentModel.findOne({ _id: id });
  try {
    if (req.body.teacherRelation === student.teacherRelation) {
      await StudentModel.findByIdAndDelete({ _id: id });
    } else {
      res.send({ msg: "You are not Authorized to do this action" });
    }

    res.send({ msg: "student has been deleted" });
  } catch (error) {
    res.send({ msg: error });
  }
});
studentRoute.patch("/update/:id", auth, async (req, res) => {
  const { id } = req.params;
  const student = await StudentModel.findOne({ _id: id });
  try {
    if (req.body.teacherRelation === student.teacherRelation) {
      await StudentModel.findByIdAndUpdate({ _id: id }, req.body);
      res.send({ msg: "the srudent data has been updated" });
    } else {
      res.send({ msg: "You are not Authorized to do this action" });
    }
  } catch (error) {
    res.send({ msg: error });
  }
});

module.exports = { studentRoute };
