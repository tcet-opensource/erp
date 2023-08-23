import connector from "#models/databaseUtil";
// eslint-disable-next-line  no-unused-vars
const topicSchema = {
  title: { type: String, required: true },
};

const Topic = connector.model("topic", topicSchema);
