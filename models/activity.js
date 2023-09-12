import connector from "#models/databaseUtil";

const activitySchema = {
  activityBlueprint: { type: connector.Schema.Types.ObjectId, ref: "ActivityBlueprint", required: true },
  startTime: { type: Date, required: true },
  duration: { type: Number, required: true },
  course: { type: connector.Schema.Types.ObjectId, ref: "Course", required: true },
  faculty: { type: connector.Schema.Types.ObjectId, ref: "Faculty", required: true },
  type: {
    type: String,
    required: true,
    enum: ["LECTURE", "PRACTICAL", "TUTORIAL"],
  },
  task: [{
    type: connector.Schema.Types.ObjectId,
    ref: ["Topic", "Practical", "Tutorial"],
    required: true,
  }],
  group: { type: connector.Schema.Types.ObjectId, ref: "Group", required: true },
  students: [{ type: connector.Schema.Types.ObjectId, ref: "Student", required: true }],
};

const Activity = connector.model("Activity", activitySchema);

///crud operation///

//add a activity to the database
async function create(activityData){
  const {
    startTime,duration,course,faculty,type,task,group,students,
  }=activityData;
  const activity= new Activity({
    startTime,duration,course,faculty,type,task,group,students,
  });
  const activityDoc =await activity.save();
  return activityDoc;
}

//Retrieve activity based on a given  filter and limit
async function read(filter,limit=1){
  const activity = await Activity.find (filter).limit(limit);
  return activityDoc ; 
}

//update activity based on a given filter 
async function update(filter,updateObject,options={multi:true}){
  const updateActivity= await Activity.updateMany(filter,{$set:updateObject},options);
return updateActivity.acknowledged;
}

//Delete activity based on a given filter
async function remove(filter){
  const deleteActivity= await Activity.deleteMany(filter).exec();
  return deleteActivity.acknowledged
}

//export crud functions

export default{
  create,read,update,remove,
};

