import { spawn } from "child_process";
// import { error } from "console";
import path from "path";
// import { exit } from "process";

const databasename = "test";
// in future it will be replaced by the actual databasename

const archivedPath = path.join(path.resolve(), "..", `${databasename}.gzip`);

// console.log(archivedPath);

// erpBackup();

function erpRestore() {
  const childProcess1 = spawn("mongorestore", [
    `--db=${databasename}`,
    `--archive=${archivedPath}`,
    "--gzip",
  ]);
  childProcess1.stdout.on("data", (data) => {
    console.log("stdout:\n", Buffer.from(data).toString());
  });
  childProcess1.stderr.on("data", (data) => {
    console.log("stderr:\n", Buffer.from(data).toString());
  });
  childProcess1.on("error", (error) => {
    console.log(error);
  });
  childProcess1.on("exit", (code, signal) => {
    if (code) {
      console.log("process ends with a code:", code);
    } else if (signal) {
      console.log("process ends with a signal:", signal);
    } else {
      console.log("Database Restored successfully");
    }
  });
}

erpRestore();
