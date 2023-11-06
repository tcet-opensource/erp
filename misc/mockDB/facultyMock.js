import { faker } from "@faker-js/faker"; // eslint-disable-line import/no-extraneous-dependencies

function getRandomLetter() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomIndex = Math.floor(Math.random() * alphabet.length);
  return alphabet[randomIndex];
}

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
}

// Function to generate random 4-digit number
function getRandomNumber() {
  return Math.floor(1000 + Math.random() * 9000);
}

const generatedIDs = [];

const createRandomFaculty = (departmentId, createdCourses) => {
  let id;
  do {
    const letter = getRandomLetter();
    const number = getRandomNumber();
    id = `F${letter}${number}`;
  } while (generatedIDs.includes(id));
  generatedIDs.push(id);
  const doj = faker.date.past({ years: 5 });
  return {
    ERPID: id,
    dateOfJoining: doj,
    dateOfLeaving: faker.datatype.boolean({ probability: 0.4 })
      ? randomDate(doj, new Date())
      : null,
    profileLink: faker.internet.url(),
    qualifications: [
      faker.lorem.word(),
      faker.lorem.word(),
      faker.lorem.word(),
    ],
    totalExperience: faker.number.int({ min: 1, max: 20 }),
    achievements: [
      faker.lorem.words(),
      faker.lorem.words(),
      faker.lorem.words(),
    ],
    areaOfSpecialization: [
      faker.lorem.word(),
      faker.lorem.word(),
      faker.lorem.word(),
    ],
    papersPublishedPG: faker.number.int({ min: 0, max: 50 }),
    papersPublishedUG: faker.number.int({ min: 0, max: 50 }),
    department: departmentId,
    preferredSubjects: createdCourses,
    designation: faker.helpers.arrayElements(
      [
        "HOD",
        "Assistant Professor",
        "Associate Professor",
        "Activity Head",
        "Professor",
        "Director",
        "T&P Officer",
        "R&D Activity Head",
      ],
      { min: 1, max: 3 },
    ),
    natureOfAssociation: faker.helpers.arrayElement([
      "Regular",
      "Contract",
      "Adjunct",
    ]),
    additionalResponsibilities: faker.lorem.words(),
  };
};

const generateFaculty = (createdDepts, createdCourses) => {
  const faculty = [];
  let selectedCourses;
  for (let i = 0, j = 1; i < createdDepts.length; j += 1) {
    selectedCourses = faker.helpers.arrayElements(createdCourses, {
      min: 4,
      max: 8,
    });
    faculty.push(createRandomFaculty(createdDepts[i], selectedCourses));
    if (j > 30) {
      i += 1;
      j = 0;
    }
  }
  return faculty;
};

export default generateFaculty;
