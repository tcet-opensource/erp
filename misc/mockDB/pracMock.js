import { faker } from "@faker-js/faker"; // eslint-disable-line import/no-extraneous-dependencies

const generateRandomLevels = () => {
  const levels = [];
  const numLevels = faker.number.int({ min: 1, max: 6 });
  for (let i = 0; i < numLevels; i += 1) {
    levels.push(`L${i + 1}`);
  }
  return levels;
};

const createRandomPracticals = (i, ptype) => ({
  no: i,
  type: ptype,
  title: faker.lorem.sentence(),
  hours: faker.number.int({ min: 3, max: 12 }),
  cognitiveLevels: generateRandomLevels(),
});

const generatePracticals = () => {
  const practicals = [];
  for (let i = 1, j = 1; j <= 60; i += 1) {
    let type;
    if (i <= 5) type = "BASIC";
    else if (i <= 10) type = "DESIGN";
    else type = "PROJECT";
    practicals.push(createRandomPracticals(i, type));
    if (i === 12) {
      i = 0;
      j += 1;
    }
  }
  return practicals;
};

export default generatePracticals;
