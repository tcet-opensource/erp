import connector from "#models/databaseUtil";

const courseworkSchema = {
  student: {
    type: connector.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  type: { type: String, enum: ["onCampus", "offCampus"], required: true },
  course: {
    type: connector.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  task: {
    type: connector.Schema.Types.ObjectId,
    required: true,
  },
  activity: {
    type: connector.Schema.Types.ObjectId,
    ref: "Activity",
    required: true,
  },
  marks: { type: Number, required: true },
};

const Coursework = connector.model("Coursework", courseworkSchema);

async function remove(filter) {
  const deleteResult = await Coursework.deleteMany(filter);
  return deleteResult.acknowledged;
}

async function create(courseworkData) {
  const { student, type, course, task, objectID, activity, marks } =
    courseworkData;
  const coursework = new Coursework({
    student,
    type,
    course,
    task,
    objectID,
    activity,
    marks,
  });
  const courseworkDoc = await coursework.save();
  return courseworkDoc;
}

async function createMultiple(courseworkDataArray) {
  const courseworks = courseworkDataArray.map(
    ({ student, type, course, task, objectID, activity, marks }) =>
      Coursework({
        student,
        type,
        course,
        task,
        objectID,
        activity,
        marks,
      }),
  );

  const courseworkDocs = await Coursework.insertMany(courseworks);
  return courseworkDocs;
}

async function read(filter, limit = 0, page = 1) {
  const courseworkDoc = await Coursework.find(filter)
    .limit(limit)
    .skip((page - 1) * limit)
    .exec();
  const count = await Coursework.count();
  const totalPages = Math.ceil(count / limit);
  return { totalPages, data: courseworkDoc };
}

async function update(filter, updateObject, options = { multi: true }) {
  const updateResult = await Coursework.updateMany(
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
  createMultiple,
};
