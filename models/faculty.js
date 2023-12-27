import connector from "#models/databaseUtil";

const facultySchema = {
  ERPID: { type: String, required: true },
  dateOfJoining: { type: Date, required: true, default: Date.now },
  dateOfLeaving: { type: Date, required: false },
  profileLink: { type: String, required: true },
  qualifications: { type: [String], required: true },
  totalExperience: { type: Number, required: true },
  achievements: { type: [String], required: true },
  areaOfSpecialization: { type: [String], required: true },
  papersPublishedPG: { type: Number, required: true },
  papersPublishedUG: { type: Number, required: true },
  department: {
    type: connector.Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  preferredSubjects: [
    { type: connector.Schema.Types.ObjectId, ref: "Course", required: true },
  ],
  designation: {
    type: [String],
    enum: [
      "HOD",
      "Assistant Professor",
      "Associate Professor",
      "Activity Head",
      "Professor",
      "Director",
      "T&P Officer",
      "R&D Activity Head",
    ],
    required: true,
  },
  natureOfAssociation: {
    type: String,
    enum: ["Regular", "Contract", "Adjunct"],
    required: true,
  },
  additionalResponsibilities: { type: String, required: true },
};

const Faculty = connector.model("Faculty", facultySchema);

// CRUD Operations

async function remove(filter) {
  const deleteResult = await Faculty.deleteMany(filter);
  return deleteResult.acknowledged;
}

async function create(facultyData) {
  const faculty = new Faculty(facultyData);
  const facultyDoc = await faculty.save({ session: facultyData.session });
  return facultyDoc;
}

async function createMultiple(facultyDataArray) {
  const facultys = facultyDataArray.map(
    ({
      ERPID,
      dateOfJoining,
      dateOfLeaving,
      profileLink,
      qualifications,
      totalExperience,
      achievements,
      areaOfSpecialization,
      papersPublishedPG,
      papersPublishedUG,
      department,
      preferredSubjects,
      designation,
      natureOfAssociation,
      additionalResponsibilities,
    }) =>
      Faculty({
        ERPID,
        dateOfJoining,
        dateOfLeaving,
        profileLink,
        qualifications,
        totalExperience,
        achievements,
        areaOfSpecialization,
        papersPublishedPG,
        papersPublishedUG,
        department,
        preferredSubjects,
        designation,
        natureOfAssociation,
        additionalResponsibilities,
      }),
  );

  const facultyDocs = await Faculty.insertMany(facultys);
  return facultyDocs;
}

async function read(filter, limit = 0, page = 1) {
  const facultyDoc = await Faculty.find(filter)
    .limit(limit)
    .skip((page - 1) * limit);
  const count = await Faculty.count();
  const totalPages = Math.ceil(count / limit);
  return { totalPages, data: facultyDoc };
}

async function update(filter, updateObject, options = { multi: true }) {
  const updateResult = await Faculty.updateMany(
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
