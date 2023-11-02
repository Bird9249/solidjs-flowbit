/* eslint-disable no-undef */
const { randomUUID } = require('crypto')
const { faker } = require("@faker-js/faker");

const Gender = ['Male', 'Female', 'Other']

const generateUserData= () => {
    const randomIndex = Math.floor(Math.random() * Gender.length);

    const user = {};
    user.id = randomUUID();
    user.username = faker.internet.userName();
    user.email = faker.internet.email();
    user.password = faker.internet.password();
    user.verifyAt = faker.date.past().toISOString();
    user.createdAt = new Date()
    user.updatedAt = new Date()

    let profile = {};
    profile.id = randomUUID();
    profile.firstName = faker.person.firstName();
    profile.lastName = faker.person.lastName();
    profile.gender = Gender[randomIndex];
    profile.profileUrl = faker.image.avatar();
    profile.createdAt = new Date()
    profile.updatedAt = new Date()

    user.profileId = profile.id
    profile.userId = user.id;

    return {user, profile}
}

exports.generateUserData = generateUserData ;
