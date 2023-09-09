import connector from "#models/databaseUtil";
const semesterSchema = {
  number:{ type: Number,enum: [1,2,3,4,5,6,7,8], required:true},
  academicYear: {
    type: String,
    required: true,
    validate: {
      validator: (value) => /^20\d{2}$/.test(value),
      message: (props) => `${props.value} is not a valid year format starting with "2"!`,
    },
  },
  type:{ enum: ["ODD", "EVEN"], required: true },

  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
};

// eslint-disable-next-line  no-unused-vars
const Semester = connector.model("Semester", semesterSchema);

//  CURD operations
async function create(semesterData) {
    const {
      number,
      academicYear,
      type,
      startDate,
      endDate,
    } = semesterData;
    const semester = new Semester({
      number,
      academicYear,
      type,
      startDate,
      endDate,

    });
    const semesterDoc = await semester.save();
    return semesterDoc;
  }
  
  async function read(filter, limit = 1) {
    const semesterDoc = await Semester.find(filter).limit(limit);
    return semesterDoc;
  }
  
  async function update(filter, updateObject, options = { multi: true }) {
    const updateResult = await Semester.updateMany(filter, { $set: updateObject }, options);
    return updateResult.acknowledged;
  }
  
  async function remove(filter) {
    const deleteResult = await Semester.deleteMany(filter);
    return deleteResult.acknowledged;
  }
  export default {
    create, remove, update, read,
  };
  
