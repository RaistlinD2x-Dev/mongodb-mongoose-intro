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

  it('Can add subdocuments to existing records', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [],
    });

    joe
      .save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        user.posts.push({ title: 'New Post' });
        return user.save();
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts[0].title === 'New Post');
        done();
      });
  });

  it('can remove an existing subdocument', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'New Post' }],
    });

    joe
      .save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        user.posts[0].remove();
        return user.save();
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts.length === 0);
        done();
      });
  });
});
