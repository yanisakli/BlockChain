import User from '../model/User'

export default async function() {
  // Please note that when using async/await you lose the `bluebird` promise context
  // and you fall back to native
  return User.sync({ force: true }).then(() => {
    // Now the `users` table in the database corresponds to the model definition
    return User.create({
      name: 'John'
    });
  });
}
