import { faker } from "@faker-js/faker"; // eslint-disable-line import/no-extraneous-dependencies

const accreditationNames = [
  "National Board of Accreditation",
  "Quality Council of India",
  "Distance Education Council",
  "National Council for Teacher Education",
  "Scientific Institute and Research Organizations",
  "National Assessment and Accreditation Council",
];

const accreditationAbbrev = ["NBA", "QCI", "DEC", "NCTE", "SIROs", "NAAC"];

const createRandomAccreditations = (i) => ({
  name: accreditationAbbrev[i],
  agencyName: accreditationNames[i],
  dateofAccreditation: faker.date.past({ years: 2 }),
  dateofExpiry: faker.date.future({ years: 3 }),
});

const generatedAccreditations = () => {
  const accreditations = [];
  for (let i = 0; i < 6; i += 1) {
    accreditations.push(createRandomAccreditations(i));
  }
  return accreditations;
};
const ACCREDS = generatedAccreditations();
export default ACCREDS;
