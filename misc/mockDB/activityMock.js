import { faker } from "@faker-js/faker"; // eslint-disable-line import/no-extraneous-dependencies

const generateRandomActivity = (
  randomBlueprint,
  randomCourse,
  randomFaculty,
  randomGroup,
  tutorialList,
  practicalList,
  topicList,
  studentList,
) => {
  const activityType = faker.helpers.arrayElement([
    "TUTORIAL",
    "PRACTICAL",
    "LECTURE",
  ]); // Randomly select activity type
  let taskIds;

  if (activityType === "TUTORIAL") {
    taskIds = [faker.helpers.arrayElement(tutorialList, { min: 2, max: 3 })];
  } else if (activityType === "PRACTICAL") {
    taskIds = [faker.helpers.arrayElement(practicalList, { min: 1, max: 2 })];
  } else {
    taskIds = faker.helpers.arrayElements(topicList, { min: 2, max: 5 });
  }

  const studentsCount = faker.number.int({ min: 1, max: 30 }); // Random number of students (1 to 30)
  const studentsIds = faker.helpers.arrayElements(studentList, studentsCount); // Randomly select students

  return {
    activityBlueprint: randomBlueprint, // Assuming `randomInfra` contains activityBlueprint reference
    course: randomCourse, // Assuming `randomCourse` is an object with an _id property
    faculty: randomFaculty, // Assuming `randomFaculty` is an object with an _id property
    task: taskIds, // Assuming `task` is an object with an _id property (from tutorialList, practicalList, or topicList)
    group: randomGroup, // Assuming `randomGroup` is an object with an _id property
    students: studentsIds, // Assuming each student object in `studentList` has an _id property
  };
};

const generateActivity = (
  activityBlueprintList,
  courseList,
  facultyList,
  groupList,
  tutorialList,
  practicalList,
  topicList,
  studentList,
) => {
  const activities = [];
  for (let i = 0; i < 100000; i += 1) {
    const randomBlueprint = faker.helpers.arrayElement(activityBlueprintList);
    const randomCourse = faker.helpers.arrayElement(courseList);
    const randomFaculty = faker.helpers.arrayElement(facultyList);
    const randomGroup = faker.helpers.arrayElement(groupList);

    const activityData = generateRandomActivity(
      randomBlueprint,
      randomCourse,
      randomFaculty,
      randomGroup,
      tutorialList,
      practicalList,
      topicList,
      studentList,
    );
    activities.push(activityData);
  }
  return activities;
};

export default generateActivity;
