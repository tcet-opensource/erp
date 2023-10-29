import { spawn } from "child_process";
import request from "supertest";
import app from "#app"; // Update this import based on your app"s structure
import connector from "#models/databaseUtil"; // Update this import

const server = app.listen(null, () => {
  connector.set("debug", false);
});
const agent = request.agent(server);

const child = spawn("node", ["./misc/initDB"]);
global.server = server;
global.agent = agent;
global.child = child;
export default async () => {
  global.server = server;
  global.agent = agent;
  global.child = child;
};
