import connector from "#models/databaseUtil";

const applicationSchema = {
  ERPID: { type: String, required: true },
  type: {
    type: String,
    enum: ["insert", "update", "delete"],
    required: true,
  },
  data: {
    type: connector.Schema.Types.ObjectId,
    ref: "Data",
    required: "true",
  },
  collection: { type: String, required: true },
};
const Application = connector.model("Application",applicationSchema );

//crud operation
async function create(applicationData) {
    const {
      ERPID,
      type,
      data,
      collection,
    } = applicationData;
    const application = new Application({
      ERPID,
      type,
      data,
      collection,
    });
    const applicationDoc = await application.save();
    return applicationDoc;
  }
  
  async function createMultiple(applicationDataArray) {
    const applications = applicationDataArray.map(
      ({
        ERPID,
        type,
        data,
        collection,
      }) =>
        Application({
        ERPID,
        type,
        data,
        collection,
        }),
    );
  
    const applicationDocs = await Application.insertMany(applications);
    return applicationDocs;
  }
  
  async function read(filter, limit = 0, page = 1) {
    const applicationDoc = await Application.find(filter)
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();
    const count = await Application.count();
    const totalPages = Math.ceil(count / limit);
    return { totalPages, data: applicationDoc };
  }
  
  async function update(filter, updateObject, options = { multi: true }) {
    const updateApplication = await Application.updateMany(
      filter,
      { $set: updateObject },
      options,
    );
    return updateApplication.acknowledged;
  }

  async function remove(filter) {
    const deleteApplication = await Application.deleteMany(filter).exec();
    return deleteApplication.acknowledged;
  }

  export default {
    create,
    read,
    update,
    remove,
    createMultiple,
  };