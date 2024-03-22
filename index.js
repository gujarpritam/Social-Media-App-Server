const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

// app.use(bodyParser.urlencoded());
// app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("1st express server");
});

const User = mongoose.model("User", {
  firstName: String,
  lastName: String,
  email: String,
  avatar: String,
});

// const Child = mongoose.model("Child", {
//   firstName: String,
//   lastName: String,
//   class: Number,
// });

// get request
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json({
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

// get with specific id
app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const users = await User.findById(id);
    res.json({
      data: users,
    });
  } catch (error) {
    res.json({
      message: "Something went wrong",
    });
  }
});

// post request
app.post("/users", async (req, res) => {
  const { firstName, lastName, email, avatar } = req.body;
  try {
    await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      avatar: avatar,
    });
    res.json({
      status: "SUCCESS",
    });
  } catch (error) {
    res.json({
      message: "Something went wrong",
    });
  }
});

// patch method
app.patch("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, avatar } = req.body;
  try {
    await User.findByIdAndUpdate(id, {
      firstName, //
      lastName, //
      email,
      avatar,
    });
    res.json({
      status: "SUCCESS",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

// put method
app.put("/users/:id", (req, res) => {
  let userId = req.params.id;
  // const { firstName, lastName, classNumber } = req.body;

  let newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    avatar: req.body.avatar,
  };
  // console.log(firstName + " " + lastName + " " + classNumber);
  console.log(req.body);
  User.findByIdAndUpdate(userId, newUser)
    .then((data) => {
      res.json({
        message: "SUCCESS",
      });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.json({
      status: "SUCCESS",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

// search with specific details
app.get("/users", async (req, res) => {
  try {
    // const { firstName, lastName, classNumber } = req.query;

    // console.log(firstName + " " + lastName + " " + classNumber);

    // console.log(typeof classNumber);

    console.log(req.query);
    // const query = {};
    // if (firstName) {
    //   query.firstName = firstName;
    // }
    // if (lastName) {
    //   query.lastName = lastName;
    // }
    // if (classNumber) {
    //   query.class = classNumber;
    // }

    const users = await User.find(req.query);
    res.json({
      status: "SUCCESS",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

app.listen(process.env.PORT, () => {
  console.log("1st express server");
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Express server is live"))
    .catch((error) => {
      console.log(error);
    });
});

// REST API:
// GET- /customers (Read)
// POST- /customers (Create)
// DELETE- /customers/:id (delete)
// PATCH- /customers/:id
