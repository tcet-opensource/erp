import { faker } from "@faker-js/faker"; // eslint-disable-line import/no-extraneous-dependencies
import Infrastructure from "#models/infrastructure";
import Accreditation from "#models/accreditation";
import Organization from "#models/organization";
import Department from "#models/department";
import Topics from "#models/topic";
import Module from "#models/module";
import Tutorial from "#models/tutorial";
import Practical from "#models/practical";
import Semester from "#models/semester";
import Course from "#models/course";
import Faculty from "#models/faculty";
import Student from "#models/student";
import Attendance from "#models/attendance";
import Notification from "#models/notification";
import User from "#models/user";
import Group from "#models/group";
import ActivityBlueprint from "#models/activityBlueprint";
import Activity from "#models/activity";
import Exam from "#models/exam";
import Paper from "#models/paper";
import Coursework from "#models/coursework";
import Timetable from "#models/timetable";
import generateOrganizations from "#mockDB/orgMock";
import ACCREDS from "#mockDB/accredMock";
import TOPICS from "#mockDB/topicMock";
import generateDepartments from "#mockDB/deptMock";
import generateModules from "#mockDB/moduleMock";
import generateInfrastructures from "#mockDB/infraMock";
import generatePracticals from "#mockDB/pracMock";
import generateTutorials from "#mockDB/tutMock";
import generateSemesters from "#mockDB/semMock";
import generateCourses from "#mockDB/courseMock";
import generateFaculty from "#mockDB/facultyMock";
import generateStudents from "#mockDB/studentMock";
import generateAttendance from "#mockDB/attendanceMock";
import generateNotifications from "#mockDB/notificationMock";
import generateUsers from "#mockDB/userMock"; // eslint-disable-line no-unused-vars
import generateGroups from "#mockDB/groupMock";
import generateActivityBP from "#mockDB/activityBPMock";
import generateActivity from "#mockDB/activityMock";
import generateExams from "#mockDB/examMock";
import generatePaper from "#mockDB/paperMock";
import generateCoursework from "#mockDB/courseworkMock";
import generateTimetables from "#mockDB/timetableMock";
/* eslint-disable no-underscore-dangle */
const createdAccreds = await Accreditation.createMultiple(ACCREDS);

const parentOrg = await Organization.create({
  startDate: faker.date.past({ years: 10 }),
  name: "Thakur Education",
  accreditations: [
    createdAccreds[faker.number.int({ min: 0, max: createdAccreds.length - 1 })]
      ._id,
    createdAccreds[faker.number.int({ min: 0, max: createdAccreds.length - 1 })]
      ._id,
  ],
});

const ORGS = generateOrganizations(parentOrg._id, createdAccreds);

const createdOrgs = await Organization.createMultiple(ORGS);

const tcetObject = createdOrgs.filter(
  (obj) => obj.name === "Thakur College of Engineering & Technology",
)[0];

const INFRA = generateInfrastructures(tcetObject._id);

const createdInfras = await Infrastructure.createMultiple(INFRA);

const filteredInfrastructures = createdInfras.filter((infrastructure) => {
  const allowedTypes = ["LAB", "CLASSROOM", "COMPUTER LAB"];
  return allowedTypes.includes(infrastructure.type);
});

const DEPTS = generateDepartments(
  tcetObject._id,
  createdAccreds.map((createdAccred) => createdAccred._id),
  filteredInfrastructures.map((createdInfra) => createdInfra._id),
);

const createdDepts = await Department.createMultiple(DEPTS);

const createdTopics = await Topics.createMultiple(TOPICS);

const MODULES = generateModules(
  createdTopics.map((createdTopic) => createdTopic._id),
);

const createdModules = await Module.createMultiple(MODULES);

const PRACS = generatePracticals();

const createdPracs = await Practical.createMultiple(PRACS);

const TUTS = generateTutorials();

const createdTuts = await Tutorial.createMultiple(TUTS);

const SEMS = generateSemesters();

const createdSems = await Semester.createMultiple(SEMS);

const COURSES = generateCourses(
  createdSems.map((createdSem) => createdSem._id),
  createdModules.map((createdModule) => createdModule._id),
  createdPracs.map((createdPrac) => createdPrac._id),
  createdTuts.map((createdTut) => createdTut._id),
  createdDepts.map((createdDept) => createdDept._id),
);

const createdCourses = await Course.createMultiple(COURSES);

const FACULTY = generateFaculty(
  createdDepts.map((createdDept) => createdDept._id),
  createdCourses.map((createdCourse) => createdCourse._id),
);

const createdFaculty = await Faculty.createMultiple(FACULTY);

const STUDENTS = generateStudents(
  createdDepts.map((createdDept) => createdDept._id),
  createdCourses.map((createdCourse) => createdCourse._id),
);

const createdStudents = await Student.createMultiple(STUDENTS);

const studentCourseList = createdStudents.map((student) => {
  const studentId = student._id.toString();
  const coursesOpted = student.coursesOpted.map((courseId) =>
    courseId.toString(),
  );
  return { studentId, coursesOpted };
});

const ATTENDANCE = generateAttendance(studentCourseList, 100);

const createdAttendance = await Attendance.createMultiple(ATTENDANCE); // eslint-disable-line no-unused-vars

const USERS = generateUsers(
  // TODO this takes forever bruhh
  createdStudents.map((createdStudent) => createdStudent.ERPID),
  createdFaculty.map((createdFac) => createdFac.ERPID),
  10,
);

const createdUsers = await User.createMultiple(USERS);

// const createdUsers = await User.read(); // use this after you initialized Users at least once, or wait for years every time

const NOTIFS = generateNotifications(
  createdUsers // remove data from each of these if you are initializing users for the first time
    .filter((user) => user.userType === "STUDENT")
    .map((student) => student._id),
  createdUsers
    .filter((user) => user.userType === "FACULTY")
    .map((faculty) => faculty._id),
  createdUsers
    .filter((user) => user.userType === "ADMIN")
    .map((admin) => admin._id),
  10,
);

const createdNotifications = await Notification.createMultiple(NOTIFS); // eslint-disable-line no-unused-vars

const GROUPS = generateGroups(
  createdUsers
    .filter((user) => user.userType === "STUDENT")
    .map((student) => student._id),
);

const createdGroups = await Group.createMultiple(GROUPS);

const ACTIVITYBP = generateActivityBP(
  createdInfras.map((createdInfra) => createdInfra._id),
  createdCourses.map((createdCourse) => createdCourse._id),
  createdFaculty.map((faculty) => faculty._id),
  createdGroups.map((createdGroup) => createdGroup._id),
);

const createdActivityBP = await ActivityBlueprint.createMultiple(ACTIVITYBP);

const ACTIVITY = generateActivity(
  createdActivityBP.map((activityBP) => activityBP._id),
  createdCourses.map((createdCourse) => createdCourse._id),
  createdFaculty.map((faculty) => faculty._id),
  createdGroups.map((createdGroup) => createdGroup._id),
  createdTuts.map((createdTut) => createdTut._id),
  createdPracs.map((createdPrac) => createdPrac._id),
  createdTopics.map((createdTopic) => createdTopic._id),
  createdStudents.map((createdStudent) => createdStudent._id),
  1000,
);

const createdActivity = await Activity.createMultiple(ACTIVITY);

const EXAMS = generateExams(
  createdInfras.map((createdInfra) => createdInfra._id),
  createdCourses.map((createdCourse) => createdCourse._id),
  createdFaculty.map((faculty) => faculty._id),
);

const createdExams = await Exam.createMultiple(EXAMS);

const PAPERS = generatePaper(
  createdStudents.map((createdStudent) => createdStudent._id),
  createdExams.map((createdExam) => createdExam._id),
  createdFaculty.map((faculty) => faculty._id),
);

const createdPapers = await Paper.createMultiple(PAPERS); // eslint-disable-line no-unused-vars

const COURSEWORK = generateCoursework(
  createdStudents.map((createdStudent) => createdStudent._id),
  createdCourses.map((createdCourse) => createdCourse._id),
  createdTuts.map((createdTut) => createdTut._id),
  createdPracs.map((createdPrac) => createdPrac._id),
  createdActivity.map((activity) => activity._id),
);

const createdCoursework = await Coursework.createMultiple(COURSEWORK); // eslint-disable-line no-unused-vars

const TIMETABLE = generateTimetables(
  createdActivityBP.map((activityBP) => activityBP._id),
  createdGroups.map((createdGroup) => createdGroup._id),
  createdFaculty.map((faculty) => faculty._id),
);

const createdTimetables = await Timetable.createMultiple(TIMETABLE); // eslint-disable-line no-unused-vars

process.exit(0);
