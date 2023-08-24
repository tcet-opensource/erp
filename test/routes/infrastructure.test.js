import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { jest } from '@jest/globals';
import databaseUtil from '#models/databaseUtil';
import app from '#app';

import InfrastructureFunctions from '#models/infrastructure';

const request = require('supertest');
jest.mock('#util');
let mongoServer;
let server;
let agent;
beforeAll((done) => {
  server = app.listen(5000, () => {
    agent = request.agent(server);
    connector.set('debug', false);
    done();
  });
});

function cleanUp(callback) {
  accreditationModel.remove({ name: 'xyz' }).then(() => {
    connector.disconnect((DBerr) => {
      if (DBerr) console.log('Database dissconnnect error: ', DBerr);
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

describe('Infrastructure API Endpoints', () => {
  // ... (beforeEach, beforeAll, afterAll, etc.)

  test('Read Infrastructure', async () => {
    await InfrastructureFunctions.create(
      'Building A',
      'Office',
      'East Wing',
      2,
      100
    );
    await InfrastructureFunctions.create(
      'Building B',
      'Residential',
      'West Wing',
      1,
      50
    );

    const response = await request(app).get('/api/infrastructures'); // Adjust the API endpoint

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body[0].name).toBe('Building A');
    expect(response.body[1].name).toBe('Building B');
  });

  test('Update Infrastructure', async () => {
    const createdInfrastructure = await InfrastructureFunctions.create(
      'Building A',
      'Office',
      'East Wing',
      2,
      100
    );

    const response = await request(app)
      .put(`/api/infrastructures/${createdInfrastructure._id}`) // Adjust the API endpoint
      .send({ capacity: 150 });

    expect(response.status).toBe(200);
    expect(response.body.capacity).toBe(150);
  });

  test('Remove Infrastructure', async () => {
    const createdInfrastructure = await InfrastructureFunctions.create(
      'Building A',
      'Office',
      'East Wing',
      2,
      100
    );

    const response = await request(app).delete(
      `/api/infrastructures/${createdInfrastructure._id}`
    ); // Adjust the API endpoint

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      name: 'Building A',
      type: 'Office',
      wing: 'East Wing',
      floor: 2,
      capacity: 100,
    });

    const infrastructuresResponse = await request(app).get(
      '/api/infrastructures'
    );
    expect(infrastructuresResponse.body).toHaveLength(0);
  });

  test('Get Infrastructure by ID', async () => {
    const createdInfrastructure = await InfrastructureFunctions.create(
      'Building A',
      'Office',
      'East Wing',
      2,
      100
    );

    const response = await request(app).get(
      `/api/infrastructures/${createdInfrastructure._id}`
    ); // Adjust the API endpoint

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      name: 'Building A',
      type: 'Office',
      wing: 'East Wing',
      floor: 2,
      capacity: 100,
    });
  });
});
