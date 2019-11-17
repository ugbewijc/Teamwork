const Request = require('request');

/* Basic Setup */
const baseUrl = 'http://localhost:3000/api/v1';
const adminEmail = 'admin@domain.com';
const adminPwd = 'admin';
const userEmail = 'admin3@domain.com';
const userPwd = 'User1';
let aToken;
let uToken;


describe('Teamwork Test Script,', () => {
  /*
  * Users Test
  */
  // <admin-signIn>
  describe('POST /auth/signin ', () => {
    it('Admin can sign in. It should return success status, along required responses', (done) => {
      const options = {
        uri: `${baseUrl}/auth/signin`,
        json: {
          email: adminEmail,
          password: adminPwd,
        },
      };
      Request.post(options, (error, response, body) => {
        // save admin token for futher tests
        aToken = body.data.token;
        expect(body.status).toBe('success');
        expect(body.data.token).toBeInstanceOf(String);
        expect(body.data.userId).toBeInstanceOf(Number);
        done();
      });
    });
  });// </admin-signIn>

  // <user-signIn>
  describe('POST /auth/signin ', () => {
    it('User can sign in. It should return success status, along required responses', (done) => {
      const options = {
        uri: `${baseUrl}/auth/signin`,
        json: {
          email: userEmail,
          password: userPwd,
        },
      };
      Request.post(options, (error, response, body) => {
        // save user's token for futher tests
        aToken = body.data.token;
        expect(body.status).toBe('success');
        expect(body.data.token).toBeInstanceOf(String);
        expect(body.data.userId).toBeInstanceOf(Number);
        done();
      });
    });
  });// </login-in-user>

  // <create-user>
  describe('POST /auth/create-user', () => {
    it('Only Admin can create an employee user account. It should return success status, along required responses', (done) => {
      const uName = Date.now();
      const options = {
        uri: `${baseUrl}/auth/create-user`,
        headers: {
          token: aToken,
        },
        json: {
          firstName: uName,
          lastName: `${uName}demo`,
          email: `${uName}@domain.com`,
          password: 'tester',
          gender: 'male',
          address: 'Lagos, Nigeria',
          jobRole: 'Tester',
          department: 'Demo',
        },
      };
      Request.post(options, (error, response, body) => {
        // save user's token for futher tests
        aToken = body.data.token;
        expect(body.status).toBe('success');
        expect(body.data.message).toBeInstanceOf(String);
        expect(body.data.token).toBeInstanceOf(String);
        expect(body.data.userId).toBeInstanceOf(Number);
        done();
      });
    });
  });// </create-user>

  /*
  describe('Admin can create an employee user account.', () => {
    it('It should return success status, with required responses', (done) => {
      const options = {
        uri: `${baseUrl}auth/create-user`,
        json: {
          email: 'admin@domain.com',
          password: 'admin',
        },
      };
      Request.post(options, (error, response, body) => {
        expect(body.status).toBe('success');
        expect(body.data.token).toBeInstanceOf(String);
        expect(body.data.userId).toBeInstanceOf(Number);
        done();
      });
    });
  }); */

  /* Article Test */
  xdescribe('Employees can create Articles', () => {
    it('It should return success status, with required responses', (done) => {
      const options = {
        uri: `${baseUrl}/articles`,
        json: {
          email: 'admin@domain.com',
          password: 'admin',
        },
      };
      Request.post(options, (error, response, body) => {
        expect(body.status).toBe('success');
        expect(body.data.token).toBeInstanceOf(String);
        expect(body.data.userId).toBeInstanceOf(Number);
        done();
      });
    });
  });
  /*
  body:
{ status: 'success',
 data:
  { token:
     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluMkBkb21haW4uY29tIiwiaWF0IjoxNTczOTI0MjM4LCJleHAiOjE1NzM5Mjc4Mzh9.aGhWfpW6HxuaHAZd2_V4ghazVv91NReBmXbg1wQ_AmI',
    userId: 133 } } }
*/
});

/*
Request(
  {
    method: 'PUT',
    uri: 'http://mikeal.iriscouch.com/testjs/',
    multipart: [
      {
        'content-type': 'application/json',
        body: JSON.stringify(
          { foo: 'bar', _attachments: { 'message.txt': { follows: true, length: 18, 'content type': 'text/plain' } } },
        ),
      },
      { body: 'I am an attachment' },
    ],
  }, (error, response, body) => {
  },
);

const options = {
  uri: baseUrl,
  json: {
    email: 'admin2@domain.com',
    password: 'user1',
  },
};
Request.post(options)
*/
