const { default: mongoose } = require("mongoose");

const StudentSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    class: { type: String, require: true },
    teacherRelation: { type: String, require: true },
    age: { type: String, require: true },
  },
  {
    versionKey: false,
  }
);

const StudentModel = mongoose.model("student", StudentSchema);

module.exports = { StudentModel };
