const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe', postCount: 0 });
    joe.save().then(() => done());
  });

  const assertName = (operation, done) => {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'Alex');
        done();
      });
  };

  it('instance type using set n save', (done) => {
    console.log(joe);
    joe.set('name', 'Alex');
    console.log(joe);
    assertName(joe.save(), done);
  });

  it('Model instance can update', (done) => {
    assertName(joe.updateOne({ name: 'Alex' }), done());
  });

  it('model class can update', (done) => {
    assertName(User.updateMany({ name: 'Joe' }, { name: 'Alex' }), done());
  });

  it('model class can update one record', (done) => {
    assertName(User.updateOne({ name: 'Joe' }, { name: 'Alex' }), done());
  });

  it('model class can find a record with id and update', (done) => {
    assertName(User.updateOne(joe._id, { name: 'Alex' }), done());
  });

  it('A user can have their postCount incremented by 1 using modifier', (done) => {
    User.updateMany({ name: 'Joe' }, { $inc: { postCount: 1 } })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.postCount === 1);
        done();
      });
  });
});
