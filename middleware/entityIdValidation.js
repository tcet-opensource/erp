export async function isEntityIdValid(entityIds, EntityModel) {
  // eslint-disable-next-line no-param-reassign
  if (!Array.isArray(entityIds)) entityIds = [entityIds];
  const filter = { _id: { $in: entityIds } };
  const entities = await EntityModel.read(filter);
  return entities.data.length === entityIds.length;
}
