import { faker } from "@faker-js/faker"; // eslint-disable-line import/no-extraneous-dependencies

const generateRandomPapers = (randomStudent, randomExam, randomFaculty) => ({
  answerSheetID: faker.string.alphanumeric(10),
  exam: randomExam,
  student: randomStudent,
  checkedBy: randomFaculty,
  mark: faker.number.int({ min: 0, max: 100 }),
});

const generatePapers = (studentList, examList, facultyList) => {
  const papers = [];
  for (let i = 0; i < 1000; i += 1) {
    papers.push(
      generateRandomPapers(
        faker.helpers.arrayElement(studentList),
        faker.helpers.arrayElement(examList),
        faker.helpers.arrayElement(facultyList),
      ),
    );
  }
  return papers;
};

export default generatePapers;
