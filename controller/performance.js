import os from "os";
import dotenv from "dotenv";
import semesterModel from "#models/semester";

dotenv.config();
const { PORT } = process.env;

async function performance(req, res) {
  const startTimeDb = new Date().getTime();
  const testDB = await semesterModel.read({})
    .then(() => {
      const time = new Date().getTime() - startTimeDb;
      return time;
    });

  const startTime = new Date().getTime();
  fetch(`http://localhost:${PORT}/semester/list`)
    .then(() => {
      const time = new Date().getTime() - startTime;
      res.json({
        responseTime: time, cpu: os.cpus(), maxMem: os.totalmem(), freeMem: os.freemem(), dbTime: testDB
      });
    });
}

export default performance;
