import Module from "#models/module";
import databaseError from "#error/database";

export async function getModule(filter) {
  const modules = await Module.read(filter);
  if (modules) {
    return modules;
  }
  throw new databaseError.DataNotFoundError("Module");
}
