import connector from "#models/databaseUtil";

const topicSchema = {
  title: { type: String, required: true },
};
// eslint-disable-next-line  no-unused-vars
const Topic = connector.model("topic", topicSchema);
