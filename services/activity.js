import Activity from "#models/activity" ;
import databaseError from "#error/database";

export async function createActivity (startTime,duration,course,faculty,type,task,group,students){
    const newActivity = await Activity.create({
        startTime,duration,course,faculty,task,type,group,students,
    });
    if (newActivity.title===title){
        return newActivity;
    }
    throw new databaseError.DataEntryError("actvity");
}

export async function updateActivityById(id,data){
const updated= await Activity.update({_id:id},data);
if (updated){
    return updated;
}
throw new databaseError.DataEntryError("activity");
}

export async function activityList(filter){
    const activitylist = await Activity.read(filter,0);
    return activitylist;
}

export async function deleteActivityById(activityId){
    const deleted = await Activity.remove({_id:id},data);
    if(deleted){
        return deleted;
    }
    throw new databaseError.DataDeleteError("activity");
}