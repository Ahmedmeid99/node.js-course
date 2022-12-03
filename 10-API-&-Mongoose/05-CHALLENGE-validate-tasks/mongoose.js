const mongoose = require("mongoose");
const validator = require("validator");

///////////////////////////////////////////////////
// mongoose.connect('mongodb:localgost:port/databaseName')
mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  //   useNewUrlParser: true,
  //   useCreateIndex: true,
});

// //Create Model
const User = mongoose.model("User", {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw Error("Email is not valid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    maxlength: 20,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error('you can not use this word in password "password"');
      }
    },
  },
  age: {
    type: Number,
    trim: true,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw Error("Age is not valid");
      }
    },
  },
});

// // Create New User
// const me = new User({
//   name: "  Eid",
//   email: "  AHMED@gmail.com",
//   age: 20,
//   password: "eid199963_-_!",
// });
// me.save()
//   .then(() => console.log(me))
//   .catch((error) => console.log(`Error: ${error}`));

/*************************************/
/*************(CHALLENGE)*************/
/*************************************/
//Create Model
const Task = mongoose.model("Task", {
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const firstTask = new Task({
  description: "  learn React js ",
});

firstTask
  .save()
  .then((task) => console.log(task))
  .catch((error) => {
    console.log("error:" + " " + error);
  });

/*
 * C:/Users/Ezz/mongodb/bin/mongod.exe --dbpath C:/Users/Ezz/mongodb-data
 *
 */
