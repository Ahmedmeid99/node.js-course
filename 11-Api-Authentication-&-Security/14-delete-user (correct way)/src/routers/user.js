const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");

const User = require("../models/user");
//
// Create user & end point (POST)
router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

// login & end point (POST)
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});
// logout & end point (POST)
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send(e);
  }
});

// logout & end point (POST)
router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send(e);
  }
});

// Read users &  end point (GET)
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

// Update user by id
router.patch("/users/:id", async (req, res) => {
  // handle update key (is not defind)
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.send(400).send({ error: "Invalid updates!" });
  }
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// delete user by id
router.delete("/users/me", auth, async (req, res) => {
  // handle update key (is not defind)
  try {
    res.send(req.user);
    await req.user.remove();
  } catch (e) {
    res.status(400).send(e);
  }
});

// [ 2 ] delete user by id
// router.delete("/users/me",auth, async (req, res) => {
//   // handle update key (is not defind)
//   try {
//     const user = await User.findByIdAndDelete(req.user._id);
//     if (!user) {
//       return res.status(404).send();
//     }
//     res.send(user);
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });
module.exports = router;
