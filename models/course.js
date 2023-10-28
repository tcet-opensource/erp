import connector from "#models/databaseUtil";

const courseSchema = {
  name: { type: String, required: true },
  code: { type: String, required: true },
  theoryHours: { type: Number },
  tutorialHours: { type: Number },
  practicalHours: { type: Number },
  ISAMarks: { type: Number },
  ESEMarks: { type: Number },
  tutorialMarks: { type: Number },
  practicalMarks: { type: Number },
  semester: {
    type: connector.Schema.Types.ObjectId,
    ref: "Semester",
    required: true,
  },
  department: {
    type: connector.Schema.Types.ObjectId,
    ref: "Department",
  },
  subType: {
    type: String,
    enum: ["open", "professional", "core"],
    required: true,
  }, // can be open, professional, or core
  prerequisites: { type: [String], required: true }, // array of strings
  objective: { type: String, required: true },
  outcomes: [
    {
      outcome: { type: String },
      RBTLevel: { type: [String] },
    },
  ], // this is the modules from syllabus
  modules: [{ type: connector.Schema.Types.ObjectId, ref: "Module" }],
  practicals: [{ type: connector.Schema.Types.ObjectId, ref: "Practical" }],
  tutorials: [{ type: connector.Schema.Types.ObjectId, ref: "Tutorial" }],
  assignments: [{ type: connector.Schema.Types.ObjectId, ref: "Assignment" }],
  reccTextbooks: { type: [String], required: true },
  refBooks: { type: [String], required: true },
};

const Course = connector.model("Course", courseSchema);

/// CRUD operations ///

async function create(courseData) {
  const course = new Course(courseData);
  const courseDoc = await course.save();
  return courseDoc;
}

async function createMultiple(courseDataArray) {
  const courses = courseDataArray.map(
    ({
      name,
      code,
      theoryHours,
      department,
      tutorialHours,
      practicalHours,
      ISAMarks,
      ESEMarks,
      tutorialMarks,
      practicalMarks,
      semester,
      subType,
      prerequisites,
      objective,
      outcomes,
      modules,
      practicals,
      tutorials,
      assignments,
      reccTextbooks,
      refBooks,
    }) =>
      Course({
        name,
        code,
        theoryHours,
        department,
        tutorialHours,
        practicalHours,
        ISAMarks,
        ESEMarks,
        tutorialMarks,
        practicalMarks,
        semester,
        subType,
        prerequisites,
        objective,
        outcomes,
        modules,
        practicals,
        tutorials,
        assignments,
        reccTextbooks,
        refBooks,
      }),
  );

  const courseDocs = await Course.insertMany(courses);
  return courseDocs;
}

async function read(filter, limit = 0, page = 1) {
  const courseDoc = await Course.find(filter)
    .limit(limit)
    .skip((page - 1) * limit)
    .exec();
  const count = await Course.count();
  const totalPages = Math.ceil(count / limit);
  return { totalPages, data: courseDoc };
}

async function update(filter, updateObject, options = { multi: true }) {
  const updateResult = await Course.updateMany(
    filter,
    { $set: updateObject },
    options,
  );
  return updateResult.acknowledged;
}

async function remove(filter) {
  const deleteResult = await Course.deleteMany(filter).exec();
  return deleteResult.acknowledged;
}

export default {
  create,
  read,
  update,
  remove,
  createMultiple,
};
