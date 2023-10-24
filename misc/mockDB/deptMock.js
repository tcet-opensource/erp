import { faker } from "@faker-js/faker"; // eslint-disable-line import/no-extraneous-dependencies

/* eslint-disable no-underscore-dangle */
const departmentNames = [
  "Mechanical Engineering",
  "Civil Engineering",
  "Computer Engineering",
  "Information Technology",
  "Electronics and Telecommunication Engineering",
  "Electronics and Computer Science",
  "Artificial Intelligence and Data Science",
  "Internet of Things",
  "Artificial Intelligence and Machine Learning",
  "Computer Science and Engineering (Cyber Security)",
  "Mechanical and Mechatronics Engineering (Additive Manufacturing)",
  "Artificial Intelligence and Data Science",
  "Software Development",
  "Animation & Graphic Designing",
  "Data Analytics",
];
const departmentAbbrev = [
  "ME",
  "CE",
  "CS",
  "IT",
  "ETE",
  "ECS",
  "AIDS",
  "IOT",
  "AIML",
  "CSS",
  "MEMM",
  "AIDS",
  "SD",
  "AGD",
  "DA",
];

const createRandomDepartment = (
  i,
  tcetObjectId,
  createdAccreds,
  createdInfra,
) => {
  const infrastructuresPerDepartment = Math.floor(
    createdInfra.length / departmentNames.length,
  );
  const startIdx = i * infrastructuresPerDepartment;
  const endIdx = (i + 1) * infrastructuresPerDepartment;
  const allocatedInfra = createdInfra.slice(startIdx, endIdx);
  return {
    name: departmentNames[i],
    acronym: departmentAbbrev[i],
    yearOfStarting: faker.date.past({ years: 10 }),
    accreditations: [
      createdAccreds[
        faker.number.int({ min: 0, max: createdAccreds.length - 1 })
      ],
      createdAccreds[
        faker.number.int({ min: 0, max: createdAccreds.length - 1 })
      ],
    ],
    infrastructures: allocatedInfra,
    organization: tcetObjectId,
  };
};

const generateDepartments = (tcetObjectId, createdAccreds, createdInfra) => {
  const departments = [];
  for (let i = 0; i < departmentNames.length; i += 1) {
    departments.push(
      createRandomDepartment(i, tcetObjectId, createdAccreds, createdInfra),
    );
  }
  return departments;
};

export default generateDepartments;
