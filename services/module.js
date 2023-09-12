import Module from "#models/module";
import databaseError from "#error/database";

export async function getModule(filter) {
  const modules = await Module.read(filter);
  if (modules) {
    return modules;
  }
  throw new databaseError.DataNotFoundError("Module");
}

export async function addNewModule(no, name, outcome, contents, hrsPerModule, cognitiveLevels) {
  const newModule = await Module.create({
    no, name, outcome, contents, hrsPerModule, cognitiveLevels,
  });
  if (newModule.name === name) {
    return newModule;
  }
  throw new databaseError.DataEntryError("Add Module");
}
