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
  department: { type: connector.Schema.Types.ObjectId, ref: "Department", required: true },
  preferredSubjects: [{ type: connector.Schema.Types.ObjectId, ref: "Course", required: true }],
  designation: { type: [String], enum: ["HOD", "Assistant Professor", "Associate Professor", "Activity Head"], required: true },
  natureOfAssociation: { type: String, enum: ["Regular", "Contract", "Adjunct"], required: true },
  additionalResponsibilities: { type: String, required: true },
};

facultySchema.virtual("tcetexperience").get(() => {
  const currentDate = new Date();
  const joiningYear = this.dateOfJoining.getFullYear();
  const leavingYear = this.dateOfLeaving
    ? this.dateOfLeaving.getFullYear
    : currentDate.getFullYear;
  return leavingYear - joiningYear;
});

const Faculty = connector.model("Faculty", facultySchema);

// CRUD Operations

async function remove(filter) {
  const deleteResult = await Faculty.deleteMany(filter);
  return deleteResult.acknowledged;
}

async function create(facultyData) {
  const faculty = new Faculty(facultyData);
  const facultyDoc = await faculty.save();
  return facultyDoc;
}

async function read(filter, limit = 1) {
  const facultyDoc = await Faculty.find(filter).limit(limit);
  return facultyDoc;
}

async function update(filter, updateObject, options = { multi: true }) {
  const updateResult = await Faculty.updateMany(filter, { $set: updateObject }, options);
  return updateResult.acknowledged;
}

export default {
  create, read, update, remove,
};
