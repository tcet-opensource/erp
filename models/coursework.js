import connector from "#models/databaseUtil";

const courseworkSchema = {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true},
    type:{type : String , enum : ['onCampus','offCampus'], required: true},
    course:{type:mongoose.Schema.Types.ObjectId, ref: 'Course', required:true},
    task: {type: mongoose.Schema.Types.ObjectId, refPath: 'objectID', required: true },
        objectID: {type: String, enum: ['Practical', 'Tutorial', 'Assignment'], required: true},
    activity:{type:mongoose.Schema.Types.ObjectId, ref: 'Activity',required:true},
    marks: {type: Number, required: true},
};
const Coursework = connector.model('Coursework', courseworkSchema);

module.exports = Coursework;
