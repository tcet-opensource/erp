import { faker } from "@faker-js/faker"; // eslint-disable-line import/no-extraneous-dependencies

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

function generateRandomYear() {
  const currentYear = new Date().getFullYear();
  const availableYears = Array.from(
    { length: 4 },
    (_, index) => currentYear - index,
  );
  const randomIndex = Math.floor(Math.random() * availableYears.length);
  return availableYears[randomIndex].toString().slice(-2);
}

function generateRandomThreeDigitNumber() {
  return Math.floor(100 + Math.random() * 900);
}

function generateStudentID(i) {
  const departmentInitials = departmentAbbrev[i];
  const year = generateRandomYear();
  const randomThreeDigitNumber = generateRandomThreeDigitNumber();
  return `S${departmentInitials}${year}${randomThreeDigitNumber}`;
}

const generatedIDs = [];

const createRandomStudent = (department, createdCourses, k, j, i) => {
  let id;
  let divisionLetter;
  do id = generateStudentID(i);
  while (generatedIDs.includes(id));
  generatedIDs.push(id);
  if (j >= 120) divisionLetter = "C";
  else if (j >= 60) divisionLetter = "B";
  else divisionLetter = "A";
  return {
    ERPID: id,
    name: faker.person.fullName(),
    joiningYear: new Date().getFullYear() - k,
    branch: department,
    division: divisionLetter,
    rollNo: (j % 60) + 1,
    coursesOpted: createdCourses,
  };
};

const generateStudents = (createdDepts, createdCourses) => {
  const students = [];
  let selectedCourses;
  for (let i = 0, j = 0, k = 0; k < 4; j += 1) {
    selectedCourses = faker.helpers.arrayElements(createdCourses, 7);
    students.push(
      createRandomStudent(createdDepts[i], selectedCourses, k, j, i),
    );
    if (j >= 179) {
      i += 1;
      j = -1;
    }
    if (i === createdDepts.length) {
      i = 0;
      k += 1;
    }
  }
  return students;
};

export default generateStudents;
