import {
    createActivity,deleteActivityById, activityList ,updateActivityById,
}from "#services/activity";
import {logger} from "#util" ;

async function addActivity(req,res) {
    const{
        activityBlueprint,
        startTime,
        duration,
        course,
        faculty,
        type,
        task,
        group,
        students,
    }=req.body;
    try{
        const newActivity = await createActivity(activityBlueprint,startTime,duration,course,faculty,type,task,group,students);
        res.json ({res: `added activity ${newActivity.id}`, id: newActivity.id});
    } catch (error){
        logger.error ("Error while inserting",error);
        res.status(500);
        res.json({err:"Error while inserting in DB"});
    }
}

async function updateActivity(req,res){
    const { id }=req.params;
    const {
        ...data  
    }=req.body;
    try {
         await updateActivityById(id,data);
        res.json({res:`updated activity with id ${id}`});
    }catch (error){
        logger.error("Error while updating",error);
        res.status(500);
        res.json({err:"Error while updating in DB"});
    }
}

async function getActivity(req,res){
    const filter = req.query;
    const activitylist =await activityList(filter);
    res.json({res:activitylist});
}


async function deleteActivity(res,req){
    const { id }=req.params;
    try{
        await deleteActivityById(id);

        res.json({res:`Deleted activity with ID ${id}`});
    }catch(error){
        logger.error ("Error while deleting",error);
        res.status(500).json({error:"Error while deleting from DB"});
    }
}

export default {
    addActivity, deleteActivity ,getActivity ,updateActivity,
};