import { faker } from "@faker-js/faker"; // eslint-disable-line import/no-extraneous-dependencies

const generateGroups = (studentList) => {
  const groups = [];

  // First iteration: 30 students per group
  for (let i = 0; i < studentList.length; i += 30) {
    const groupTitle = faker.lorem.words(2); // Generate a random group title
    const group = {
      title: groupTitle,
      students: studentList.slice(i, i + 30), // Take 30 students for this iteration
    };
    groups.push(group);
  }

  // Second iteration: 5 students per group
  for (let i = 0; i < studentList.length; i += 5) {
    const groupTitle = faker.lorem.words(2); // Generate a random group title
    const group = {
      title: groupTitle,
      students: studentList.slice(i, i + 5), // Take 5 students for this iteration
    };
    groups.push(group);
  }

  return groups;
};

export default generateGroups;
