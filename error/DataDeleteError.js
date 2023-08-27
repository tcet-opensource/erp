export class DataDeleteError extends Error {
  constructor(modelName) {
    super(`Error while deleting document in ${modelName}`);
    this.name = "DataDeleteError";
  }
}
