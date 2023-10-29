const teardownProcess = () => {
  global.child.kill();
};

global.server.close();
global.agent.app.close();
global.child.stdin.end();
global.child.stdout.destroy();
global.child.stderr.destroy();
setTimeout(teardownProcess, 500);
export default async () => {};
