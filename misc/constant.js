export const logLevel = {
  local: "silly",
  dev: "debug",
  prod: "info",
};

export const departmentNames = [
  "Mechanical Engineering",
  "Civil Engineering",
  "Computer Engineering",
  "Information Technology",
  "Electronics and Telecommunication Engineering",
  "Electronics and Computer Science",
  "Artificial Intelligence and Data Science",
  "Internet of Things",
  "Artificial Intelligence and Machine Learning",
  "Computer Science and Engineering (Cyber Security)",
  "Mechanical and Mechatronics Engineering (Additive Manufacturing)",
  "Artificial Intelligence and Data Science",
  "Software Development",
  "Animation & Graphic Designing",
  "Data Analytics",
];
export const departmentAbbrev = [
  "ME",
  "CE",
  "CS",
  "IT",
  "ETE",
  "ECS",
  "AIDS",
  "IOT",
  "AIML",
  "CSS",
  "MEMM",
  "AIDS",
  "SD",
  "AGD",
  "DA",
];

export async function commitWithRetry(session) {
  let i = 0;
  while (i < 3) {
    try {
      session.commitTransaction(); // Uses write concern set at transaction start.
      break;
    } catch (error) {
      console.log(error);
      i += 1;
    }
  }
}
