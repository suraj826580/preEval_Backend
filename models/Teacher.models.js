const mongoose = require("mongoose");

const TeacherSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    class: { type: String, require: true },
    subject: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
  },
  {
    versionKey: false,
  }
);

const TeacherModel = mongoose.model("teacher", TeacherSchema);

module.exports = { TeacherModel };
