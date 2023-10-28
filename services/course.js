import Course from "#models/course";
import databaseError from "#error/database";

export async function createCourse(
  name,
  code,
  theoryHours,
  department,
  tutorialHours,
  practicalHours,
  ISAMarks,
  ESEMarks,
  tutorialMarks,
  practicalMarks,
  semester,
  subType,
  prerequisites,
  objective,
  outcomes,
  modules,
  practicals,
  tutorials,
  assignments,
  reccTextbooks,
  refBooks,
) {
  const newCourse = await Course.create({
    name,
    code,
    theoryHours,
    department,
    tutorialHours,
    practicalHours,
    ISAMarks,
    ESEMarks,
    tutorialMarks,
    practicalMarks,
    semester,
    subType,
    prerequisites,
    objective,
    outcomes,
    modules,
    practicals,
    tutorials,
    assignments,
    reccTextbooks,
    refBooks,
  });
  if (newCourse.name === name) {
    return newCourse;
  }
  throw new databaseError.DataEntryError("Course");
}

export async function courseList(filter, limit, page) {
  const facList = await Course.read(filter, limit, page);
  if (facList) {
    return facList;
  }
  throw new databaseError.DataNotFoundError("Course");
}

export async function deleteCourseById(courseId) {
  const deleted = await Course.remove({ _id: courseId });
  if (deleted) {
    return deleted;
  }
  throw new databaseError.DataDeleteError("Course");
}

export async function updateCourseById(id, data) {
  const updated = await Course.update({ _id: id }, data);
  if (updated) {
    return updated;
  }
  throw new databaseError.DataEntryError("Course");
}

export default {
  createCourse,
  courseList,
  deleteCourseById,
  updateCourseById,
};
