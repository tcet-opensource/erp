import { faker } from "@faker-js/faker"; // eslint-disable-line import/no-extraneous-dependencies

const generateRandomTimetables = (
  randomActivityBP,
  randomFaculty,
  randomGroup,
) => ({
  startDate: faker.date.past(),
  endDate: faker.date.future(),
  classIncharge: randomFaculty,
  group: randomGroup,
  activityBlueprints: randomActivityBP,
  lunchbreakStartTime: faker.helpers.arrayElement(["12:00", "13:00", "14:00"]),
  lunchbreakDuration: faker.number.int({ min: 30, max: 120 }),
  teabreakStartTime: faker.helpers.arrayElement(["10:00", "15:00", "16:00"]),
  teabreakDuration: faker.number.int({ min: 15, max: 60 }),
});

const generateTimetable = (activityBPList, groupList, facultyList) => {
  const timetables = [];
  for (let i = 0; i < 300; i += 1) {
    timetables.push(
      generateRandomTimetables(
        faker.helpers.arrayElement(activityBPList),
        faker.helpers.arrayElement(facultyList),
        faker.helpers.arrayElement(groupList),
      ),
    );
  }
  return timetables;
};

export default generateTimetable;
