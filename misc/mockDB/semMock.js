const createRandomSemesters = (i, year, ptype) => ({
  number: i,
  academicYear: year,
  type: ptype,
  startDate: `${year}-${ptype === "ODD" ? "06" : "01"}-01T00:00:00.000Z`,
  endDate: `${year}-${ptype === "ODD" ? "12" : "06"}-01T00:00:00.000Z`,
});

const generateSemesters = () => {
  const semesters = [];
  let year;
  let type;
  for (let i = 7, j = 4; j > 0; i += 1) {
    year = `${2024 + Math.floor(i / 2 - j)}`;
    type = i % 2 ? "ODD" : "EVEN";
    semesters.push(createRandomSemesters(i, year, type));
    if (i >= 8) {
      j -= 1;
      i = j * 2 - 2;
    }
  }
  return semesters;
};

export default generateSemesters;
