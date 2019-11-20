const Request = require('request');
const fs = require('fs');
const token = require('../util/token');

describe('Teamwork Test Script,', () => {
  /* Basic Setup http://localhost:3000/api/v1 */
  const baseUrl = 'https://ugbewijc-teamwork.herokuapp.com/api/v1';
  const adminEmail = 'admin@domain.com';
  const adminPwd = 'demo';
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
  * User Test
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

  /*
  *Article Test
  */

  // <post-article>
  describe('POST /articles', () => {
    it('Employee can Create an article. It should return success status, along required responses', (done) => {
      // const uName = Math.floor(Math.random() * Math.floor(2000));
      const options = {
        uri: `${baseUrl}/articles`,
        headers: {
          token: uToken,
        },
        json: {
          title: `${Date.now()} test`,
          article: 'demo from test script',
        },
      };
      Request.post(options, (error, response, body) => {
        expect(body.status).toBe('success');
        expect(body.data.message).toBeInstanceOf(String);
        expect(body.data.articleId).toBeInstanceOf(Number);
        expect(body.data.title).toBeInstanceOf(String);
        expect(body.data.createdOn).toBeInstanceOf(String);
        done();
      });
    });
  });// </post-article>

  // <get-article>
  describe('GET /articles/<:articleId>', () => {
    it('Employees can view a specific article. It should return success status, along required responses', (done) => {
      // const articleId = Math.floor(Math.random() * Math.floor(10));
      const options = {
        uri: `${baseUrl}/articles/1`,
        headers: {
          token: uToken,
        },
        json: {},
      };
      Request.get(options, (error, response, body) => {
        expect(body.status).toBe('success');
        expect(body.data.id).toBeInstanceOf(Number);
        expect(body.data.createdOn).toBeInstanceOf(String);
        expect(body.data.title).toBeInstanceOf(String);
        expect(body.data.article).toBeInstanceOf(String);
        expect(body.data.comments).toBeInstanceOf(Object);
        done();
      });
    });
  });// </get-article>

  // <patch-article>
  describe('PATCH /articles/<:articleId>', () => {
    it('Employees can Edit an article. It should return success status, along required responses', (done) => {
      // const articleId = Math.floor(Math.random() * Math.floor(10));
      const options = {
        uri: `${baseUrl}/articles/10`,
        headers: {
          token: uToken,
        },
        json: {
          title: ` Patch test on ${Date.now()} `,
          article: 'Patch demo from test script',
        },
      };
      Request.patch(options, (error, response, body) => {
        expect(body.status).toBe('success');
        expect(body.data.message).toBeInstanceOf(String);
        expect(body.data.title).toBeInstanceOf(String);
        expect(body.data.article).toBeInstanceOf(String);
        done();
      });
    });
  });// </get-article>

  // <post-article-comments>
  describe('POST /articles/<articleId>/comment', () => {
    it('Employees can comment on other colleagues article post. It should return success status, along required responses', (done) => {
      // const articleId = Math.floor(Math.random() * Math.floor(10));
      const options = {
        uri: `${baseUrl}/articles/10/comment`,
        headers: {
          token: uToken,
        },
        json: {
          comment: ` comment test on ${Date.now()} `,
        },
      };
      Request.post(options, (error, response, body) => {
        expect(body.status).toBe('success');
        expect(body.data.message).toBeInstanceOf(String);
        expect(body.data.createdOn).toBeInstanceOf(String);
        expect(body.data.articleTitle).toBeInstanceOf(String);
        expect(body.data.article).toBeInstanceOf(String);
        expect(body.data.comment).toBeInstanceOf(String);
        done();
      });
    });
  });// </post-article-comments>

  // <delete-article>
  describe('DELETE /articles/<:articleId>', () => {
    it('Employees can comment on other colleagues article post. It should return success status, along required responses', (done) => {
      // const articleId = Math.floor(Math.random() * Math.floor(10));
      const options = {
        uri: `${baseUrl}/articles/20`,
        headers: {
          token: uToken,
        },
        json: {
        },
      };
      Request.delete(options, (error, response, body) => {
        expect(body.status).toBe('success');
        expect(body.data.message).toBeInstanceOf(String);
        done();
      });
    });
  });// <delete-article>

  /*
  *Gif Test
  */
  // <post-gif>
  describe('POST /gifs', () => {
    it('Employee can Create a gif. It should return success status, along required responses', (done) => {
      const fomData = {
        // path: 'gifs',
        image: fs.createReadStream('spec/gif_Tenor.gif'),
        title: `${Date.now()} Gif test`,
      };
      Request.post({
        url: `${baseUrl}/gifs`,
        headers: { token: uToken },
        formData: fomData,
      },
      (error, response, body) => {
        const resBody = JSON.parse(body);
        expect(resBody.status).toBe('success');
        expect(resBody.data.gifId).toBeInstanceOf(Number);
        expect(resBody.data.message).toBeInstanceOf(String);
        expect(resBody.data.createdOn).toBeInstanceOf(String);
        expect(resBody.data.title).toBeInstanceOf(String);
        expect(resBody.data.imageUrl).toBeInstanceOf(String);
        done();
      });
    });
  });// </post-gif>

  // <get-gif>
  describe('GET /gifs/<:gifId>', () => {
    it('Employees can view a specific gif post. It should return success status, along required responses', (done) => {
      // const articleId = Math.floor(Math.random() * Math.floor(10));
      const options = {
        uri: `${baseUrl}/gifs/3`,
        headers: {
          token: uToken,
        },
        json: {},
      };
      Request.get(options, (error, response, body) => {
        expect(body.status).toBe('success');
        expect(body.data.id).toBeInstanceOf(Number);
        expect(body.data.createdOn).toBeInstanceOf(String);
        expect(body.data.title).toBeInstanceOf(String);
        expect(body.data.url).toBeInstanceOf(String);
        expect(body.data.comments).toBeInstanceOf(Object);
        done();
      });
    });
  });// </get-gif>

  // <post-gif-comments>
  describe('POST /gifs/<:gifId>/comment', () => {
    it('Employees can comment on other colleagues gif post. It should return success status, along required responses', (done) => {
      // const articleId = Math.floor(Math.random() * Math.floor(10));
      const options = {
        uri: `${baseUrl}/gifs/3/comment`,
        headers: {
          token: uToken,
        },
        json: {
          comment: ` comment test on ${Date.now()} `,
        },
      };
      Request.post(options, (error, response, body) => {
        expect(body.status).toBe('success');
        expect(body.data.message).toBeInstanceOf(String);
        expect(body.data.createdOn).toBeInstanceOf(String);
        expect(body.data.gifTitle).toBeInstanceOf(String);
        expect(body.data.comment).toBeInstanceOf(String);
        done();
      });
    });
  });// </post-gif-comments>

  // <delete-gif>
  describe('DELETE /gifs/<:gifId>', () => {
    it('Employees can delete their gifs. It should return success status, along required responses', (done) => {
      // const articleId = Math.floor(Math.random() * Math.floor(10));
      const options = {
        uri: `${baseUrl}/gifs/20`,
        headers: {
          token: uToken,
        },
        json: {
        },
      };
      Request.delete(options, (error, response, body) => {
        expect(body.status).toBe('success');
        expect(body.data.message).toBeInstanceOf(String);
        done();
      });
    });
  });// <delete-gif>

  /*
  *Get Feed Test
  */
  // <get-feed>
  describe('GET /feed', () => {
    it(`Employees can view all articles or gifs, showing the most recently posted articles
      or gifs first. It should return success status, along required responses`, (done) => {
      const options = {
        uri: `${baseUrl}/feed`,
        headers: {
          token: uToken,
        },
        json: {},
      };
      Request.get(options, (error, response, body) => {
        expect(body.status).toBe('success');
        expect(body.data).toBeInstanceOf(Object);
        done();
      });
    });
  });// </get-feed>
});
