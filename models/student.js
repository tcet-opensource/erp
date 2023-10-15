import connector from "#models/databaseUtil";

const studentSchema = {
  ERPID: { type: String, required: true },
  name: { type: String, required: true },
  joiningYear: { type: Number, required: true },
  branch: {
    type: connector.Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  division: { type: String, enum: ["A", "B", "C"], default: "A" },
  rollNo: { type: Number, required: true },
  coursesOpted: [
    { type: connector.Schema.Types.ObjectId, ref: "Course", required: true },
  ],
};

// eslint-disable-next-line  no-unused-vars

const Student = connector.model("Student", studentSchema);

// CRUD OPERATIONS

async function remove(filter) {
  const deleteResult = await Student.deleteMany(filter);
  return deleteResult.acknowledged;
}

async function create(studentData) {
  const { ERPID, name, joiningYear, branch, division, rollNo, coursesOpted } =
    studentData;
  const student = new Student({
    ERPID,
    name,
    joiningYear,
    branch,
    division,
    rollNo,
    coursesOpted,
  });
  const studentDoc = await student.save();
  return studentDoc;
}

async function read(filter, limit = 0, page = 1) {
  const studentDoc = await Student.find(filter)
    .limit(limit)
    .skip((page - 1) * limit)
    .exec();
  const count = await Student.count();
  const totalPages = Math.ceil(count / limit);
  return { totalPages, data: studentDoc };
}

async function update(filter, updateObject, options = { multi: true }) {
  const updateResult = await Student.updateMany(
    filter,
    { $set: updateObject },
    options,
  );
  return updateResult.acknowledged;
}

export default {
  create,
  read,
  update,
  remove,
};
