require("dotenv").config();
var path = require("path");
const db = require("../db/connection");
var profile = db.sequelize.import(
  path.join(__dirname, "../db/models/profile.js")
);

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

async function createProfile(body, files, callback) {
  try {
    let profileCheck = await profile.findOne({ where: { email: body.email } });

    if (profileCheck) {
      await profile.update(
        {
          profilePicture: files.path,
          userName: body.userName,
          password: body.password,
          phoneNumber: body.phoneNumber,
          dateOfBirth: body.dateOfBirth,
          timeOfBirth: body.timeOfBirth,
          gender: body.gender,
          language: body.language,
          maritalStatus: body.maritalStatus,
        },
        { where: { email: body.email } }
      );

      callback(null, "Profile updated succesfully");
    } else {
      let newProfile = await profile.create({
        profilePicture: files.path,
        userName: body.userName,
        email: body.email,
        password: body.password,
        phoneNumber: body.phoneNumber,
        dateOfBirth: body.dateOfBirth,
        timeOfBirth: body.timeOfBirth,
        gender: body.gender,
        language: body.language,
        maritalStatus: body.maritalStatus,
      });
      callback(null, newProfile);
    }
  } catch (error) {
    console.log(error);
    callback(new Error(error));
  }
}

module.exports.createProfile = createProfile;
