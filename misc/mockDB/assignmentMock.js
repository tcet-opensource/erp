import { faker } from "@faker-js/faker"; // eslint-disable-line import/no-extraneous-dependencies

const generateRandomLevels = () => {
  const levels = [];
  const numLevels = faker.number.int({ min: 1, max: 6 });
  for (let i = 0; i < numLevels; i += 1) {
    levels.push(`L${i + 1}`);
  }
  return levels;
};

const createRandomTutorials = (i) => ({
  no: i,
  title: faker.lorem.sentence(),
  type: faker.number.int({ min: 3, max: 12 }),
  marks: generateRandomLevels(),
});

const generateTutorials = () => {
  const tutorials = [];
  for (let i = 1, j = 1; j <= 20; i += 1) {
    tutorials.push(createRandomTutorials(i));
    if (i === 10) {
      i = 0;
      j += 1;
    }
  }
  return tutorials;
};

export default generateTutorials;
