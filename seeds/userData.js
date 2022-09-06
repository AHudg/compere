const { User } = require("../models");

const userdata = [
  {
    username: "Spyromancy",
    password: "password",
    email: "josh.haddix598@gmail.com",
  },
  {
    username: "Timmy_Jones",
    password: "actually12",
    email: "iamachild@gmail.com",
  },
  {
    username: "newUser",
    password: "password",
    email: "newUser@gmail.com",
  },
];

const seedUser = () => User.bulkCreate(userdata);

module.exports = seedUser;
