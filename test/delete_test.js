const assert = require('assert');
const User = require('../src/user');

describe('deleting a user', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    joe.save().then(() => done());
  });

  it('model instance remove', (done) => {
    joe
      .remove()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method deleteMany', (done) => {
    // remove many
    User.deleteMany({ name: 'Joe' })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method deleteOne', (done) => {
    User.deleteOne({ name: 'Joe' })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  // deprecated, not following this part of the course
  //   it('class method findByIdAndRemove', () => {});
});
