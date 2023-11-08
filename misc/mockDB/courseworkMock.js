import { faker } from "@faker-js/faker"; // eslint-disable-line import/no-extraneous-dependencies

const generateRandomCoursework = (
  randomStudent,
  randomCourse,
  randomTutorial,
  randomPractical,
  randomActivity,
) => ({
  student: randomStudent,
  type: faker.helpers.arrayElement(["onCampus", "offCampus"]),
  course: randomCourse,
  task: faker.helpers.arrayElement([randomTutorial, randomPractical]),
  activity: randomActivity,
  marks: faker.number.int({ min: 0, max: 100 }),
});

const generateCoursework = (
  studentList,
  courseList,
  tutorialList,
  practicalList,
  activityList,
) => {
  const courseworks = [];
  for (let i = 0; i < 10000; i += 1) {
    courseworks.push(
      generateRandomCoursework(
        faker.helpers.arrayElement(studentList),
        faker.helpers.arrayElement(courseList),
        faker.helpers.arrayElement(tutorialList),
        faker.helpers.arrayElement(practicalList),
        faker.helpers.arrayElement(activityList),
      ),
    );
  }
  return courseworks;
};

export default generateCoursework;
