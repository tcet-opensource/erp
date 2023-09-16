import { jest } from '@jest/globals'; // eslint-disable-line import/no-extraneous-dependencies
import request from 'supertest';
import app from '#app';
import connector from '#models/databaseUtil';
import examModel from '#models/exam';

jest.mock('#util');

let server;
let agent;

beforeAll((done) => {
  server = app.listen(null, () => {
    agent = request.agent(server);
    connector.set('debug', false);
    done();
  });
});

function cleanUp(callback) {
  examModel
    .remove({
      id: '3200594e2b7b532006c073aa',
    })
    .then(() => {
      connector.disconnect((DBerr) => {
        if (DBerr) console.log('Database disconnect error: ', DBerr);
        server.close((serverErr) => {
          if (serverErr) console.log(serverErr);
          callback();
        });
      });
    });
}

afterAll((done) => {
  cleanUp(done);
});

describe('exam API', () => {
  it('should create exam', async () => {
    const response = await agent.post('/exam/add').send({
      date: '2023-08-20T14:10:30Z',
      startTime: '2023-05-18T14:10:30Z',
      duration: 5,
      supervisor: '4500594e2b7b532006c073cv',
      infrastructure: '8500594e2b7b532006c073uj',
      course: '2500594e2b7b532006c073bb',
    });
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.status).toBe(200);
    expect(response.body.res).toMatch(/added exam/);
  });

  describe('after adding exam', () => {
    let id;
    beforeEach(async () => {
      id = await agent.post('/exam/add').send({
        date: '2023-08-20T14:10:30Z',
        startTime: '2023-05-18T14:10:30Z',
        duration: 5,
        supervisor: '4500594e2b7b532006c073cv',
        infrastructure: '8500594e2b7b532006c073uj',
        course: '2500594e2b7b532006c073bb',
      });
      id = JSON.parse(id.res.text).id;
    });

    afterEach(async () => {
      await examModel.remove({
        id: '3200594e2b7b532006c073aa',
      });
    });

    it('should read exam', async () => {
      const response = await agent
        .get('/exam/list')
        .send({ supervisor: '4500594e2b7b532006c073cv' });
      expect(response.status).toBe(200);
      expect(response.body.res).toBeDefined();
    });

    it('should update exam', async () => {
      const response = await agent
        .post(`/exam/update/${id}`)
        .send({ duration: 5 }, { duration: 10 });
      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.status).toBe(200);
      expect(response.body.res).toMatch(/updated exam/);
    });
  });
});
