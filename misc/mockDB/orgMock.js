import { faker } from "@faker-js/faker"; // eslint-disable-line import/no-extraneous-dependencies

/* eslint-disable no-underscore-dangle */
const institutions = [
  // Schools
  "Thakur Shyamnarayan High School",
  "Thakur Public School",
  "Thakur Vidya Mandir High School & Junior College",
  "Thakur International School",
  "Thakur Vidya Mandir Global School",
  "Thakur School of Global Education",

  // Colleges
  "Thakur College of Science & Commerce",
  "Thakur Ramnarayan College of Arts and Commerce",
  "Thakur Ramnarayan College of Law",
  "Thakur Shyamnarayan Degree College",

  // Professional Colleges
  "Thakur College of Engineering & Technology",
  "Thakur Polytechnic",
  "Thakur Institute of Management Studies & Research",
  "Thakur Institute of Career Advancement",
  "Thakur Institute of Management Studies, Career Development & Research",
  "Thakur Institute of Aviation Technology",
  "Thakur Shyamnarayan College of Education & Research",
  "Thakur School of Architecture and Planning",
  "Thakur Global Business School",
  "Thakur Institute of Hotel Management",
  "Thakur Toonskool Advanced Animation Academy",
];

const createRandomOrganizations = (i, parentOrgId, createdAccreds) => ({
  parent: parentOrgId,
  startDate: faker.date.past({ years: 10 }),
  name: institutions[i],
  accreditations: [
    createdAccreds[faker.number.int({ min: 0, max: createdAccreds.length - 1 })]
      ._id,
    createdAccreds[faker.number.int({ min: 0, max: createdAccreds.length - 1 })]
      ._id,
  ],
});

const generateOrganizations = (parentOrgId, createdAccreds) => {
  const departments = [];
  for (let i = 0; i < institutions.length; i += 1) {
    departments.push(createRandomOrganizations(i, parentOrgId, createdAccreds));
  }
  return departments;
};
export default generateOrganizations;
