export async function isEntityIdValid(entityId, EntityModel) {
  // Checking if the provided ID exists in the database collection
  const entity = await EntityModel.findById(entityId);

  return !!entity;
}
