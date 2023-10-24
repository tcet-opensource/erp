import { faker } from "@faker-js/faker"; // eslint-disable-line import/no-extraneous-dependencies
import Infrastructure from "#models/infrastructure";
import Accreditation from "#models/accreditation";
import Organization from "#models/organization";
import Department from "#models/department";
import Topics from "#models/topic";
import Module from "#models/module";
import generateOrganizations from "#mockDB/orgMock";
import ACCREDS from "#mockDB/accredMock";
import TOPICS from "#mockDB/topicMock";
import generateDepartments from "#mockDB/deptMock";
import generateModules from "#mockDB/moduleMock";
import generateInfrastructures from "#mockDB/infraMock";
/* eslint-disable no-underscore-dangle */
const createdAccreds = await Accreditation.createMultiple(ACCREDS);

const parentOrg = await Organization.create({
  startDate: faker.date.past({ years: 10 }),
  name: "Thakur Education",
  accreditations: [
    createdAccreds[faker.number.int({ min: 0, max: createdAccreds.length - 1 })]
      ._id,
    createdAccreds[faker.number.int({ min: 0, max: createdAccreds.length - 1 })]
      ._id,
  ],
});

const ORGS = generateOrganizations(parentOrg._id, createdAccreds);

const createdOrgs = await Organization.createMultiple(ORGS);

const tcetObject = createdOrgs.filter(
  (obj) => obj.name === "Thakur College of Engineering & Technology",
)[0];

const INFRA = generateInfrastructures(tcetObject._id);

const createdInfras = await Infrastructure.createMultiple(INFRA);

const filteredInfrastructures = createdInfras.filter((infrastructure) => {
  const allowedTypes = ["LAB", "CLASSROOM", "COMPUTER LAB"];
  return allowedTypes.includes(infrastructure.type);
});

const DEPTS = generateDepartments(
  tcetObject._id,
  createdAccreds.map((createdAccred) => createdAccred._id),
  filteredInfrastructures.map((createdInfra) => createdInfra._id),
);

const createdDepts = await Department.createMultiple(DEPTS); // eslint-disable-line no-unused-vars

const createdTopics = await Topics.createMultiple(TOPICS);

const MODULES = await generateModules(
  createdTopics.map((createdTopic) => createdTopic._id),
);

const createdModules = await Module.createMultiple(MODULES); // eslint-disable-line no-unused-vars

process.exit(0);
