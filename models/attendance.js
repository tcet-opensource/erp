import connector from "#models/databaseUtil";

connector.set("debug", true);

const attendanceSchema = {
  student: { type: connector.Schema.Types.ObjectId, ref: "Student", required: "true" },
  course: { type: connector.Schema.Types.ObjectId, ref: "Course", required: "true" },
  monthlyAttended: { type: Number, default: 0 },
  monthlyOccured: { type: Number, default: 0 },
  cumulativeAttended: { type: Number, default: 0 },
  cumulativeOccured: { type: Number, default: 0 },
};

const Attendance = connector.model("Attendance", attendanceSchema);

async function create(attendanceData) {
  const {
    student, course, monthlyAttended, monthlyOccured, cumulativeAttended, cumulativeOccured,
  } = attendanceData;
  const attendance = new Attendance({
    student,
    course,
    monthlyAttended,
    monthlyOccured,
    cumulativeAttended,
    cumulativeOccured,
  });
  const attendanceDoc = await attendance.save();
  return attendanceDoc;
}

async function read(filter, limit = 1) {
  const attendanceDoc = await Attendance.find(filter).limit(limit);
  return attendanceDoc;
}

async function update(filter, updateObject, options = { multi: true }) {
  const updateResult = await Attendance.updateMany(filter, { $set: updateObject }, options);
  return updateResult.acknowledged;
}

async function remove(filter) {
  const deleteResult = await Attendance.deleteMany(filter);
  return deleteResult.acknowledged;
}
export default {
  create, remove, update, read,
};
