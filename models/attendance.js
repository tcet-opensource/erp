import connector from "#models/databaseUtil";

const attendanceSchema = {
  student: {
    type: connector.Schema.Types.ObjectId,
    ref: "Student",
    required: "true",
  },
  course: {
    type: connector.Schema.Types.ObjectId,
    ref: "Course",
    required: "true",
  },
  monthlyAttended: { type: Number, default: 0 },
  monthlyOccured: { type: Number, default: 0 },
  cumulativeAttended: { type: Number, default: 0 },
  cumulativeOccured: { type: Number, default: 0 },
};

const Attendance = connector.model("Attendance", attendanceSchema);

async function create(attendanceData) {
  const {
    student,
    course,
    monthlyAttended,
    monthlyOccured,
    cumulativeAttended,
    cumulativeOccured,
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

async function createMultiple(attendanceDataArray) {
  const attendances = attendanceDataArray.map(
    ({
      student,
      course,
      monthlyAttended,
      monthlyOccured,
      cumulativeAttended,
      cumulativeOccured,
    }) =>
      Attendance({
        student,
        course,
        monthlyAttended,
        monthlyOccured,
        cumulativeAttended,
        cumulativeOccured,
      }),
  );

  const attendanceDocs = await Attendance.insertMany(attendances);
  return attendanceDocs;
}

async function read(filter, limit = 0, page = 1) {
  const attendanceDoc = await Attendance.find(filter)
    .limit(limit)
    .skip((page - 1) * limit)
    .exec();
  const count = await Attendance.count();
  const totalPages = Math.ceil(count / limit);
  return { totalPages, data: attendanceDoc };
}

async function update(filter, updateObject, options = { multi: true }) {
  const updateResult = await Attendance.updateMany(
    filter,
    { $set: updateObject },
    options,
  );
  return updateResult.acknowledged;
}

async function remove(filter) {
  const deleteResult = await Attendance.deleteMany(filter);
  return deleteResult.acknowledged;
}
export default {
  create,
  remove,
  update,
  read,
  createMultiple,
};
