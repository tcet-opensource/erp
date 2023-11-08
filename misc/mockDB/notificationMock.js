import { faker } from "@faker-js/faker"; // eslint-disable-line import/no-extraneous-dependencies

const generateNotifications = (studentIds, facultyIds, adminIds) => {
  const notifications = [];
  const notificationTypes = ["Student", "Faculty"];

  for (let i = 0; i < 300; i += 1) {
    const notification = {
      data: faker.lorem.lines({ min: 3, max: 7 }),
      title: faker.lorem.sentence(),
      from: faker.helpers.arrayElement([...facultyIds, ...adminIds]),
      type: faker.helpers.arrayElement(notificationTypes),
      filter: [],
    };

    if (notification.type === "Student") {
      notification.filter = faker.helpers.arrayElements(studentIds, {
        min: 5,
        max: 100,
      });
    } else {
      notification.filter = faker.helpers.arrayElements(
        [...facultyIds, ...adminIds],
        { min: 5, max: 100 },
      );
    }
    notifications.push(notification);
  }

  return notifications;
};

export default generateNotifications;
