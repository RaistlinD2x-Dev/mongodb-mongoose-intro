const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
  it('can create subdocument', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'Post Title' }],
    });

    joe
      .save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts[0].title === 'Post Title');
        done();
      });
  });
});
