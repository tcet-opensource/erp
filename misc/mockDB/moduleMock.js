import { faker } from "@faker-js/faker"; // eslint-disable-line import/no-extraneous-dependencies

const generateRandomLevels = () => {
  const levels = [];
  const numLevels = faker.number.int({ min: 1, max: 6 });
  for (let i = 0; i < numLevels; i += 1) {
    levels.push(`L${i + 1}`);
  }
  return levels;
};

const createRandomModules = (i, topics) => ({
  no: i,
  name: faker.lorem.sentence(),
  contents: topics,
  hrsPerModule: faker.number.int({ min: 3, max: 12 }),
  cognitiveLevels: generateRandomLevels(),
});

const generateModules = (topics) => {
  const modules = [];
  for (let i = 1; i < topics.length / 5 + 1; i += 1) {
    const moduleTopics = topics.slice(i, i + 5);
    modules.push(createRandomModules(i, moduleTopics));
  }
  return modules;
};

export default generateModules;
