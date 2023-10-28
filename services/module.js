import Module from "#models/module";
import databaseError from "#error/database";

export async function getModule(filter, limit, page) {
  const modules = await Module.read(filter, limit, page);
  if (modules) {
    return modules;
  }
  throw new databaseError.DataNotFoundError("Module");
}

export async function addNewModule(
  no,
  name,
  contents,
  hrsPerModule,
  cognitiveLevels,
) {
  const newModule = await Module.create({
    no,
    name,
    contents,
    hrsPerModule,
    cognitiveLevels,
  });
  if (newModule.name === name) {
    return newModule;
  }
  throw new databaseError.DataEntryError("Add Module");
}

export async function updateModuleById(id, data) {
  const updated = await Module.update({ _id: id }, data);
  if (updated) {
    return updated;
  }
  throw new databaseError.DataEntryError("Module");
}

export async function deleteModuleById(ModuleId) {
  const deleted = await Module.remove({ _id: ModuleId });
  if (deleted) {
    return deleted;
  }
  throw new databaseError.DataDeleteError("Module");
}
