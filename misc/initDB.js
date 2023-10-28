import { faker } from "@faker-js/faker"; // eslint-disable-line import/no-extraneous-dependencies
import Infrastructure from "#models/infrastructure";
import Accreditation from "#models/accreditation";
import Organization from "#models/organization";
import Department from "#models/department";
import Topics from "#models/topic";
import Module from "#models/module";
import Tutorial from "#models/tutorial";
import Practical from "#models/practical";
import Semester from "#models/semester";
import Course from "#models/course";
import generateOrganizations from "#mockDB/orgMock";
import ACCREDS from "#mockDB/accredMock";
import TOPICS from "#mockDB/topicMock";
import generateDepartments from "#mockDB/deptMock";
import generateModules from "#mockDB/moduleMock";
import generateInfrastructures from "#mockDB/infraMock";
import generatePracticals from "#mockDB/pracMock";
import generateTutorials from "#mockDB/tutMock";
import generateSemesters from "#mockDB/semMock";
import generateCourses from "#mockDB/courseMock";
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

const createdDepts = await Department.createMultiple(DEPTS);

const createdTopics = await Topics.createMultiple(TOPICS);

const MODULES = await generateModules(
  createdTopics.map((createdTopic) => createdTopic._id),
);

const createdModules = await Module.createMultiple(MODULES);

const PRACS = generatePracticals();

const createdPracs = await Practical.createMultiple(PRACS);

const TUTS = generateTutorials();

const createdTuts = await Tutorial.createMultiple(TUTS);

const SEMS = generateSemesters();

const createdSems = await Semester.createMultiple(SEMS);

const COURSES = generateCourses(
  createdSems.map((createdSem) => createdSem._id),
  createdModules.map((createdModule) => createdModule._id),
  createdPracs.map((createdPrac) => createdPrac._id),
  createdTuts.map((createdTut) => createdTut._id),
  createdDepts.map((createdDept) => createdDept._id),
);

const createdCourses = await Course.createMultiple(COURSES); // eslint-disable-line no-unused-vars

process.exit(0);
