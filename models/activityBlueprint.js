import connector from "#models/databaseUtil"

const activityBluePrintSchema = {
    number : { type: Number, required: true },
    academicYearYear: {
        type: String,
        required: true,
        validate: {
          validator: function(value) {
            return /^2\d{3}$/.test(value); // Matches "2" followed by any 3 digits
          },
          message: props => `${props.value} is not a valid year format starting with "2"!`
        }
      },
      type : { enum : ['ODD', 'EVEN'] , required : true},
    startDate: {type : Date, required : true},
    endDate : {type : Date, required : true}
}

const ActivityBlueprint = connector.model("ActivityBlueprint", activityBluePrintSchema);