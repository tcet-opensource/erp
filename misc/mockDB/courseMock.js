import { faker } from "@faker-js/faker"; // eslint-disable-line import/no-extraneous-dependencies

const generateRandomLevels = () => {
  const levels = [];
  const numLevels = faker.number.int({ min: 1, max: 6 });
  for (let i = 0; i < numLevels; i += 1) {
    levels.push(`L${i + 1}`);
  }
  return levels;
};

const generateRandomStrings = () => {
  const strings = [];
  for (let i = 0; i <= 6; i += 1) {
    const string = faker.lorem.sentence({ min: 3, max: 6 });
    strings.push(string);
  }
  return strings;
};

const generateRandomOutcomes = () => {
  const outcomes = [];
  for (let i = 0; i <= 6; i += 1) {
    const outcome = {
      outcome: faker.lorem.sentence({ min: 3, max: 6 }),
      RBTLevel: generateRandomLevels(),
    };
    outcomes.push(outcome);
  }
  return outcomes;
};

const createRandomCourses = (
  type,
  selectedModules,
  selectedPracs,
  selectedTuts,
  createdDept,
) => ({
  name: faker.lorem.sentence({ min: 1, max: 3 }),
  code: faker.vehicle.vin(),
  theoryHours:
    type === "onlypractical" ? null : faker.number.int({ min: 2, max: 6 }),
  department: createdDept, // TODO
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
  prerequisites: generateRandomStrings(),
  objective: faker.lorem.sentence({ min: 6, max: 10 }),
  outcomes: generateRandomOutcomes(),
  modules: selectedModules,
  practicals: selectedPracs,
  tutorials: selectedTuts,
  assignments: [],
  reccTextbooks: generateRandomStrings(),
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
  let selectedModules = [];
  let selectedPracs = [];
  let selectedTuts = [];
  for (
    let i = 0, j = 0, k = 0, l = 0, m = 0;
    j <= createdDepts.length;
    i += 1, k += 1
  ) {
    const type = faker.helpers.weightedArrayElement([
      { value: "normal", weight: 12 },
      { value: "tutorial", weight: 2 },
      { value: "nopractical", weight: 2 },
      { value: "onlypractical", weight: 1 },
    ]);
    selectedModules = [];
    selectedPracs = [];
    selectedTuts = [];
    if (type !== "onlypractical") {
      selectedModules = createdModules.slice(k, k + 5);
      k += 6;
    }
    if (type !== "nopractical") {
      selectedPracs = createdPracs.slice(l, l + 12);
      l += 13;
    }
    if (type === "tutorial") {
      selectedTuts = createdTuts.slice(m, m + 10);
      m += 11;
    }
    courses.push(
      createRandomCourses(
        type,
        selectedModules,
        selectedPracs,
        selectedTuts,
        createdDepts[j],
      ),
    );
    if (i >= createdSems.length) {
      i = 0;
      j += 1;
    }
  }
  return courses;
};

export default generateCourses;
