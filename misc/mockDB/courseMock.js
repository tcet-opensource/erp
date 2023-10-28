import { faker } from "@faker-js/faker"; // eslint-disable-line import/no-extraneous-dependencies

const generateRandomLevels = () => {
  const levels = [];
  const numLevels = faker.number.int({ min: 1, max: 6 });
  for (let i = 0; i < numLevels; i += 1) {
    levels.push(`L${i + 1}`);
  }
  return levels;
};

const generateRandomOutcomes = () => {
  const outcomes = [];
  const outcome = faker.lorem.sentence({ min: 3, max: 6 });
  for (let i = 0; i <= 6; i += 1) {
    outcomes.push(outcome);
  }
  return outcomes;
};

const createRandomCourses = (type) => ({
  name: faker.lorem.sentence({ min: 1, max: 3 }),
  code: faker.vehicle.vin(),
  theoryHours:
    type === "onlypractical" ? null : faker.number.int({ min: 2, max: 6 }),
  department: faker.database.mongodbObjectId(), // TODO
  tutorialHours:
    type === "tutorial" ? faker.number.int({ min: 2, max: 6 }) : null,
  practicalHours: faker.helpers.weightedArrayElement([
    { value: faker.number.int({ min: 2, max: 6 }), weight: 6 },
    { value: null, weight: 1 },
  ]),
  ISAMarks: 20,
  ESEMarks: 60,
  tutorialMarks: type === "tutorial" ? 20 : null,
  practicalMarks: type === "nopractical" ? null : 30,
  semester: faker.database.mongodbObjectId(),
  subType: faker.helpers.arrayElement(["open", "professional", "core"]),
  prerequisites: generateRandomOutcomes(),
  objective: faker.lorem.sentence({ min: 6, max: 10 }),
  outcomes: {
    outcome: faker.lorem.sentence({ min: 3, max: 6 }),
    RBTLevel: generateRandomLevels(),
  },
  modules: [faker.database.mongodbObjectId()],
  practicals: [faker.database.mongodbObjectId()],
  tutorials: [faker.database.mongodbObjectId()],
  assignments: [faker.database.mongodbObjectId()],
  reccTextbooks: generateRandomOutcomes(),
  refBooks: faker.lorem.word({ length: { min: 5, max: 7 } }),
});

const generateCourses = (
  createdSems,
  createdModules,
  createdPracs,
  createdTuts,
  createdDepts,
) => {
  const courses = [];
  for (let i = 0, j = 0; j <= createdDepts.length; i += 1) {
    const type = faker.helpers.weightedArrayElement([
      { value: "normal", weight: 12 },
      { value: "tutorial", weight: 2 },
      { value: "nopractical", weight: 2 },
      { value: "onlypractical", weight: 1 },
    ]);
    courses.push(createRandomCourses(type));
    if (i >= createdSems.length) {
      i = 0;
      j += 1;
    }
  }
  return courses;
};

export default generateCourses;
