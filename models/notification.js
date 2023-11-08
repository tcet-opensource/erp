import connector from "#models/databaseUtil";

const notificationSchema = {
  data: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  from: {
    type: connector.Schema.Types.ObjectId,
    ref: "User", // Reference to the Faculty model
    required: true,
  },
  type: {
    type: String,
    enum: ["Student", "Faculty"],
    required: true,
  },
  filter: [
    {
      type: connector.Schema.Types.ObjectId,
      ref: "User", // You might have a User model for storing IDs
    },
  ],
};

const Notification = connector.model("Notification", notificationSchema);

// CRUD Operations

async function create(notificationData) {
  const { data, title, from, type, filter } = notificationData;
  const notification = new Notification({
    data,
    title,
    from,
    type,
    filter,
  });
  const notificationDOC = await notification.save();
  return notificationDOC;
}

async function createMultiple(notificationDataArray) {
  const notifications = notificationDataArray.map(
    ({ data, title, from, type, filter }) =>
      Notification({
        data,
        title,
        from,
        type,
        filter,
      }),
  );

  const notificationDocs = await Notification.insertMany(notifications);
  return notificationDocs;
}

async function read(filter, limit = 0, page = 1) {
  const notificationDoc = await Notification.find(filter)
    .limit(limit)
    .skip((page - 1) * limit)
    .exec();
  const count = await Notification.count();
  const totalPages = Math.ceil(count / limit);
  return { totalPages, data: notificationDoc };
}

async function update(filter, updateObject, options = { multi: true }) {
  const updateResult = await Notification.updateMany(
    filter,
    { $set: updateObject },
    options,
  );
  return updateResult.acknowledged;
}

async function remove(filter) {
  const deleteResult = await Notification.deleteMany(filter);
  return deleteResult.acknowledged;
}

export default {
  create,
  read,
  update,
  remove,
  createMultiple,
};
