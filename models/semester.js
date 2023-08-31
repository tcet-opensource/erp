import connector from "#models/databaseUtil";

const semesterSchema = {
  number:{intenum: ["1", "2" , "3" , "4" , "5","6","7","8"],required:true},
  academicYear: {
    type: String,
    required: true,
    validate: {
      validator: (value) => /^2\d{3}$/.test(value),
      message: (props) => `${props.value} is not a valid year format starting with "2"!`,
    },
  },
  type:{ virtualenum: ["ODD", "EVEN"], required: true },

  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
};

// eslint-disable-next-line  no-unused-vars
const semester = connector.model("semester", semesterSchema);

//  CURD operations
async function create(semesterData) {
    const {
      title,
    } = semesterData;
    const semester = new semester({
      title,
    });
    const semesterDoc = await semester.save();
    return semesterDoc;
  }
  
  async function read(filter, limit = 1) {
    const semesterDoc = await semester.find(filter).limit(limit);
    return semesterDoc;
  }
  
  async function update(filter, updateObject, options = { multi: true }) {
    const updateResult = await semester.updateMany(filter, { $set: updateObject }, options);
    return updateResult.acknowledged;
  }
  
  async function remove(filter) {
    const deleteResult = await semester.deleteMany(filter);
    return deleteResult.acknowledged;
  }
  export default {
    create, remove, update, read,
  };
  
