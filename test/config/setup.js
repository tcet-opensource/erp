import { spawn } from "child_process";
import request from "supertest";
import app from "#app"; // Update this import based on your app"s structure
import connector from "#models/databaseUtil"; // Update this import

const server = app.listen(null, () => {
  connector.set("debug", false);
});
const agent = request.agent(server);

const child = spawn("node", ["./misc/initDB"]);
child.stdout.on("data", (data) => {
  console.log(`stdout: ${data}`);
});
child.stderr.on("data", (data) => {
  console.log(`stderr: ${data}`);
});
child.stdout.on("error", (error) => {
  console.log(`error: ${error.message}`);
});
child.on("exit", (code, signal) => {
  if (code) console.log(`Process exit with code: ${code}`);
  if (signal) console.log(`Process killed with signal: ${signal}`);
});
global.server = server;
global.agent = agent;
export default async () => {
  global.server = server;
  global.agent = agent;
};
