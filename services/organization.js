import Organization from "#models/organization";
import databaseError from "#error/database";

export async function addNewOrganization(parent, startDate, name, accreditation) {
  const newOrganization = await Organization.create({
    parent, startDate, name, accreditation,
  });
  if (newOrganization.name === name) {
    return newOrganization;
  }
  throw new databaseError.DataEntryError("Add Organization");
}

export async function getOrganizations(filter) {
  const organization = await Organization.read(filter);
  if (organization) {
    return organization;
  }
  throw new databaseError.DataNotFoundError("Organization");
}

export async function deleteOrganizationById(organizationId) {
  const deleted = await Organization.remove({ _id: organizationId });
  if (deleted) {
    return deleted;
  }
  throw new databaseError.DataDeleteError("Organization");
}

export async function updateOrganizationById(id, data) {
  const updated = await Organization.update({ _id: id }, data);
  if (updated) {
    return updated;
  }
  throw new databaseError.DataEntryError("Organization");
}

export default {
  deleteOrganizationById, addNewOrganization, updateOrganizationById,
};
