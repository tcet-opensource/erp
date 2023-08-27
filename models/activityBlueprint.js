import connector from "#models/databaseUtil";

const activityBluePrintSchema = {
  number: { type: Number, required: true },
  academicYearYear: {
    type: String,
    required: true,
    validate: {
      validator: (value) => /^2\d{3}$/.test(value),
      message: (props) => `${props.value} is not a valid year format starting with "2"!`,
    },
  },
  type: { enum: ["ODD", "EVEN"], required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
};

// eslint-disable-next-line  no-unused-vars
const ActivityBlueprint = connector.model("ActivityBlueprint", activityBluePrintSchema);
