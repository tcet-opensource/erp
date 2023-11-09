import Group from "#models/group";
import databaseError from "#error/database";

export async function createGroup(title, students) {
  const newGroup = await Group.create({
    title,
    students,
  });
  if (newGroup.title === title) {
    return newGroup;
  }
  throw new databaseError.DataEntryError("group");
}

export async function updateGroupById(id, data) {
  const updated = await Group.update({ _id: id }, data);
  if (updated) {
    return updated;
  }
  throw new databaseError.DataEntryError("group");
}

export async function groupList(filter, limit, page) {
  const groups = await Group.read(filter, limit, page);
  return groups;
}

export async function deleteGroupById(groupId) {
  const deleted = await Group.remove({ _id: groupId });
  if (deleted) {
    return deleted;
  }
  throw new databaseError.DataDeleteError("group");
}
