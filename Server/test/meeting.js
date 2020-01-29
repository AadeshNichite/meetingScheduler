const meeting = require('../routes/api/meeting');

describe('GET /', () => {
  it('should return 200 OK', (done) => {
    request(meeting)
      .get('/')
      .expect(200, done);
  });
});