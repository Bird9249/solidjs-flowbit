/* eslint-disable no-undef */
const userModule = require('./user');

module.exports = () => {
  const data = {users: [], profiles: []}

  for (let i = 0; i < 20; i++) {
   const {user, profile} = userModule.generateUserData()

    data.users.push(user);
    data.profiles.push(profile);
  }

  return data
}