import { faker } from "@faker-js/faker"; // eslint-disable-line import/no-extraneous-dependencies

const numberOfTopics = 10800;

// Using Array.from() and map() to generate an array of topics
const TOPICS = Array.from({ length: numberOfTopics }, () =>
  faker.lorem.sentence(),
);

export default TOPICS;
