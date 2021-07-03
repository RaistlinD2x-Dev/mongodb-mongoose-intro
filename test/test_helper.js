const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/users_test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection
  .once('open', () => console.log('connection complete'))
  .on('error', (error) => {
    console.warn('Warning!', error);
  });

beforeEach((done) => {
  mongoose.connection.collections.users.drop(() => {
    // Ready to run next test
    done();
  });
});
