import { config } from "./config.js"; // eslint-disable-line import/extensions

export default async function globalTeardown() {
  if (config.Memory) {
    // Config to decided if an mongodb-memory-server instance should be used
    const instance = global.MONGOINSTANCE;
    await instance.stop();
  }
}
