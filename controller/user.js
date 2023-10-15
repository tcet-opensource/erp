import { allUsers, createUser } from "#services/user";
import { logger } from "#util";

async function addUser(req, res) {
  const { name, password, emailId, uid, userType } = req.body;
  try {
    const newUser = await createUser(name, password, emailId, uid, userType);
    res.json({ res: `added user ${newUser.id}` });
  } catch (error) {
    logger.error("Error while inserting", error);
    res.status(500);
    res.json({ err: "Error while inserting in DB" });
  }
}

async function getAllUser(req, res) {
  const { limit, page } = req.query;
  const allUser = await allUsers(limit, page);
  res.json({ res: allUser });
}

export default { addUser, getAllUser };
