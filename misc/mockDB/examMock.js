import { faker } from "@faker-js/faker"; // eslint-disable-line import/no-extraneous-dependencies

const generateRandomExams = (randomInfra, randomCourse, randomFaculty) => ({
  date: faker.date.future(),
  startTime: faker.date.between({
    from: "2020-01-01T00:00:00.000Z",
    to: "2030-01-01T00:00:00.000Z",
  }),
  duration: faker.number.int({ min: 1, max: 2 }),
  supervisor: randomFaculty,
  infrastructure: randomInfra,
  course: randomCourse,
});

const generateExams = (infraList, courseList, facultyList) => {
  const exams = [];
  for (let i = 0; i < 3000; i += 1) {
    exams.push(
      generateRandomExams(
        faker.helpers.arrayElement(infraList),
        faker.helpers.arrayElement(courseList),
        faker.helpers.arrayElement(facultyList),
      ),
    );
  }
  return exams;
};

export default generateExams;
