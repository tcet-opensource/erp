import { faker } from "@faker-js/faker"; // eslint-disable-line import/no-extraneous-dependencies

const createRandomInfrastructure = (i, tcetObjectId) => ({
  name: i,
  type: faker.helpers.weightedArrayElement([
    { value: "LAB", weight: 3 },
    { value: "CLASSROOM", weight: 3 },
    { value: "COMPUTER LAB", weight: 2 },
    { value: "HALL", weight: 0.5 },
    { value: "CONFERENCE ROOM", weight: 0.5 },
    { value: "LIBRARY", weight: 0.5 },
    { value: "READING ROOM", weight: 0.5 },
  ]),
  wing: faker.helpers.arrayElement(["A", "B", "C"]),
  floor: Math.floor(i / 100),
  capacity: faker.number.int({ min: 30, max: 200 }),
  organization: tcetObjectId,
});

const generateInfrastructures = (tcetObjectId) => {
  const infrastructures = [];
  for (let j = 1, i = 0; j <= 6; i += 1) {
    infrastructures.push(createRandomInfrastructure(j * 100 + i, tcetObjectId));
    if (i === 25) {
      i = 0;
      j += 1;
    }
  }
  return infrastructures;
};

export default generateInfrastructures;
