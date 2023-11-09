import connector from "#models/databaseUtil";

const moduleSchema = {
  no: { type: Number, required: true },
  name: { type: String, required: true },
  contents: [
    {
      type: connector.Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
    },
  ],
  hrsPerModule: { type: Number, required: true },
  cognitiveLevels: [
    {
      type: String,
      required: true,
      enum: ["L1", "L2", "L3", "L4", "L5", "L6"],
    },
  ],
};

const Module = connector.model("Module", moduleSchema);

async function remove(filter) {
  const deleteResult = await Module.deleteMany(filter);
  return deleteResult.acknowledged;
}

async function create(moduleData) {
  const { no, name, contents, hrsPerModule, cognitiveLevels } = moduleData;
  const module = new Module({
    no,
    name,
    contents,
    hrsPerModule,
    cognitiveLevels,
  });
  const moduleDoc = await module.save();
  return moduleDoc;
}

async function createMultiple(moduleDataArray) {
  const modules = moduleDataArray.map(
    ({ no, name, contents, hrsPerModule, cognitiveLevels }) =>
      Module({
        no,
        name,
        contents,
        hrsPerModule,
        cognitiveLevels,
      }),
  );

  const moduleDocs = await Module.insertMany(modules);
  return moduleDocs;
}

async function read(filter, limit = 0, page = 1) {
  const moduleDoc = await Module.find(filter)
    .limit(limit)
    .skip((page - 1) * limit)
    .exec();
  const count = await Module.count();
  const totalPages = Math.ceil(count / limit);
  return { totalPages, data: moduleDoc };
}

async function update(filter, updateObject, options = { multi: true }) {
  const updateResult = await Module.updateMany(
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
