import { spawn } from "child_process";
import { MongoMemoryServer } from "mongodb-memory-server";
import { config } from "./config.js"; // eslint-disable-line import/extensions

function runChildProcessWithTimeout(command, args, timeout) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args);

    const timeoutId = setTimeout(() => {
      child.kill(); // Kill the child process if it exceeds the timeout
      reject(new Error("Child process timed out"));
    }, timeout);

    child.on("exit", (code, signal) => {
      clearTimeout(timeoutId); // Clear the timeout if the child process exits before the timeout
      if (code === 0) {
        resolve();
      } else {
        reject(
          new Error(
            `Child process failed with code ${code} with signal ${signal}`,
          ),
        );
      }
    });

    child.on("error", (err) => {
      clearTimeout(timeoutId); // Clear the timeout if an error occurs in the child process
      reject(err);
    });
  });
}

export default async function globalSetup() {
  console.log("initializing testDB");
  if (config.Memory) {
    // Config to decided if an mongodb-memory-server instance should be used
    // it"s needed in global space, because we don"t want to create a new instance every test-suite
    const instance = await MongoMemoryServer.create();
    const uri = instance.getUri();
    global.MONGOINSTANCE = instance;
    process.env.DB_URL = uri.slice(0, uri.lastIndexOf("/"));
  } else {
    process.env.DB_URL = `mongodb://${config.IP}:${config.Port}`;
  }
  await runChildProcessWithTimeout("node", ["./misc/testMock"], 100000)
    .then(() => {
      console.log("Child process completed successfully.");
    })
    .catch((err) => {
      console.error(`Error running child process: ${err.message}`);
    });
}
