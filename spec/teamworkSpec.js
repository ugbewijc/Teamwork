const Request = require('request');
const token = require('../util/token');

describe('Teamwork Test Script,', () => {

  /* Basic Setup */
  const baseUrl = 'http://localhost:3000/api/v1';
  const adminEmail = 'admin@domain.com';
  const adminPwd = 'admin';
  const userEmail = 'demouser@domain.com';
  const userPwd = 'demo';
  const aToken = token.generateAdminToken(adminEmail);
  const uToken = token.generateUserToken(userEmail);

  beforeAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
  });
  afterAll(() => {
  });

  /*
  * Users Test
  */

  describe('POST /auth/signin', () => {
    // <admin-signIn>
    it('Admin can sign in. It should return success status, along required responses', (done) => {
      const options = {
        uri: `${baseUrl}/auth/signin`,
        json: {
          email: adminEmail,
          password: adminPwd,
        },
      };
      Request.post(options, (error, response, body) => {
        expect(body.status).toBe('success');
        expect(body.data.token).toBeInstanceOf(String);
        expect(body.data.userId).toBeInstanceOf(Number);
        done();
      });
    });// </admin-signIn>

    // <user-signIn>
    it('User can sign in. It should return success status, along required responses', (done) => {
      const options = {
        uri: `${baseUrl}/auth/signin`,
        json: {
          email: userEmail,
          password: userPwd,
        },
      };
      Request.post(options, (error, response, body) => {
        expect(body.status).toBe('success');
        expect(body.data.token).toBeInstanceOf(String);
        expect(body.data.userId).toBeInstanceOf(Number);
        done();
      });
    });// </user-signIn>
  });
  describe('POST /auth/create-user', () => {
    // <create-user>
    it('Only Admin can create an employee user account. It should return success status, along required responses', (done) => {
      const uName = Math.floor(Math.random() * Math.floor(2000));
      const options = {
        uri: `${baseUrl}/auth/create-user`,
        headers: {
          token: aToken,
        },
        json: {
          firstName: 'uName',
          lastName: `${uName}demo`,
          email: `${uName}demo@domain.com`,
          password: 'tester',
          gender: 'male',
          address: 'Lagos, Nigeria',
          jobRole: 'Tester',
          department: 'Demo',
        },
      };

      Request.post(options, (error, response, body) => {
        expect(body.status).toBe('success');
        expect(body.data.message).toBeInstanceOf(String);
        expect(body.data.token).toBeInstanceOf(String);
        expect(body.data.userId).toBeInstanceOf(Number);
        done();
      });
    });// </create-user>
  });
});
