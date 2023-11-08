import { faker } from "@faker-js/faker"; // eslint-disable-line import/no-extraneous-dependencies
// TODO, not accurate to IRL!!
const generateRandomActivityBP = (
  randomInfra,
  randomCourse,
  randomFaculty,
  randomGroup,
) => ({
  number: faker.number.int(),
  academicYear: "2023",
  day: faker.helpers.arrayElement([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ]),
  startTime: faker.helpers.arrayElement([
    "09:00",
    "11:00",
    "13:00",
    "15:00",
    "17:00",
  ]),
  duration: faker.number.int({ min: 1, max: 2 }),
  infra: randomInfra,
  course: randomCourse,
  faculty: randomFaculty,
  type: faker.helpers.arrayElement(["lecture", "practical", "tutorial"]),
  group: randomGroup,
});

const generateActivityBP = (infraList, courseList, facultyList, groupList) => {
  const activityBP = [];
  for (let i = 0; i < 1000; i += 1) {
    activityBP.push(
      generateRandomActivityBP(
        faker.helpers.arrayElement(infraList),
        faker.helpers.arrayElement(courseList),
        faker.helpers.arrayElement(facultyList),
        faker.helpers.arrayElement(groupList),
      ),
    );
  }
  return activityBP;
};

export default generateActivityBP;
