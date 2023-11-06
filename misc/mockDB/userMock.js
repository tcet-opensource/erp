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

const generateUsers = (studentIds, facultyIds) => {
  const users = [];
  for (let i = 0; i < studentIds.length; i += 1) {
    users.push(createRandomUser(studentIds[i], "STUDENT"));
  }
  for (let i = 0; i < facultyIds.length; i += 1) {
    users.push(createRandomUser(facultyIds[i], "FACULTY"));
  }
  for (let i = 0; i < 300; i += 1) {
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
