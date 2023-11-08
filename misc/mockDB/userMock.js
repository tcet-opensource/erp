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
  "SD",
  "AGD",
  "DA",
];

function getRandomLetter() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomIndex = Math.floor(Math.random() * alphabet.length);
  return alphabet[randomIndex];
}

function getRandomNumber() {
  return Math.floor(100 + Math.random() * 900);
}

const generatedEmails = new Set();

const createRandomUser = (ID, type) => {
  let email;
  do {
    email = faker.internet.email();
  } while (generatedEmails.has(email));

  generatedEmails.add(email);

  return {
    name: faker.person.fullName(),
    emailId: email,
    password: faker.internet.password(),
    uid: ID,
    userType: type,
  };
};

const generatedIDs = [];

const checkIteration = (initial, testLength) => {
  if (testLength) {
    return testLength;
  }
  return initial;
};

const generateUsers = (studentIds, facultyIds, testLength) => {
  const users = [];
  let iterationLength = checkIteration(studentIds.length, testLength);
  for (let i = 0; i < iterationLength; i += 1) {
    users.push(createRandomUser(studentIds[i], "STUDENT"));
  }
  iterationLength = checkIteration(facultyIds.length, testLength);
  for (let i = 0; i < iterationLength; i += 1) {
    users.push(createRandomUser(facultyIds[i], "FACULTY"));
  }
  for (let i = 0; i < iterationLength; i += 1) {
    let id;
    do {
      id = `E${getRandomLetter()}${getRandomLetter()}${getRandomNumber()}`;
    } while (generatedIDs.includes(id));
    generatedIDs.push(id);
    users.push(createRandomUser(id, "EMPLOYEE"));
  }
  for (let i = 0; i < departmentAbbrev.length; i += 1) {
    users.push(createRandomUser(`A${departmentAbbrev[i]}001`, "ADMIN"));
  }
  users.push(createRandomUser("A001", "ADMIN"));
  return users;
};

export default generateUsers;
