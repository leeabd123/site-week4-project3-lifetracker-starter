const express = require("express");
const router = express.Router();
const User = require('../models/user');
const { createUserJwt } = require("../utils/token");
const security = require('../middlewear/security');
const { UnauthorizedError } = require('../utils/errors');

router.post("/login", async (req, res, next) => {
  try {
    const user = await User.login(req.body);
    const token = createUserJwt(user); 
    const publicUser = await User.makePublicUser(user);
    return res.status(200).json({ user: publicUser, token });
  } catch (err) {
    next(err);
  }
});

router.post("/register", async (req, res, next) => {
  console.log({
    "context": "auth.js/register",
    "req.body": req.body
  });
  try {
    const user = await User.register(req.body);
    const token = createUserJwt(user); 
    const publicUser = await User.makePublicUser(user);
    return res.status(201).json({ user: publicUser, token });
  } catch (err) {
    next(err);
  }
});
router.get("/me", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const { email } = res.locals.user;
    const user = await User.fetchUserByEmail(email);
    const publicUser = await User.makePublicUser(user);
    console.log('publicUser:', publicUser);
    return res.status(200).json({ isAuthenticated: true, user: publicUser });
  } catch (err) {
    next(err);
  }
});
router.post("/addEx", security.requireAuthenticatedUser, async (req, res, next) => {
  console.log(req.body);
  try {
    const { email } = res.locals.user;
    const exerciseData = { ...req.body, user_email: email };
    console.log(email, "????????", exerciseData);
    await User.addEx(exerciseData);
    console.log("it worked??")
    return res.sendStatus(200); 
  } catch (err) {
    next(err);
  }
});

router.post("/addS", security.requireAuthenticatedUser, async (req, res, next) => {
  console.log(req.body);
  try {
    const { email } = res.locals.user; 
    const sleepData = { ...req.body, user_email: email }; 
    console.log(email, "......", sleepData);
    await User.addS(sleepData);
    console.log("worked")
    return res.sendStatus(200); 
  } catch (err) {
    next(err);
  }
});


router.post("/addN", security.requireAuthenticatedUser, async (req, res, next) => {
  console.log(req.body);
  try {
    const { email } = res.locals.user; 
    const nutritionData = { ...req.body, user_email: email }; 
    console.log(email, "......", nutritionData);

    await User.addN(nutritionData);
    console.log("worked")
    return res.sendStatus(200); 
  } catch (err) {
    next(err);
  }
});
console.log("entered route excercises")

router.get("/exercises", async (req, res, next) => {
  console.log("entered route excercises")
  try {
    const { email } = res.locals.user;
    const exercises = await User.getExercisesByEmail(email);
    return res.status(200).json({ exercises });
  } catch (err) {
    next(err);
  }
});

router.get("/nutritions",  async (req, res, next) => {
  console.log("grabbing nutritions")

  try {
    const { email } = res.locals.user;
    const nutritions = await User.getNutritionByEmail(email);
    return res.status(200).json({ nutritions });
  } catch (err) {
    console.log("errorrr")
    next(err);
  }
});



router.get("/sleeps", async (req, res, next) => {
  try {
    const { email } = res.locals.user;
    const sleeps = await User.getSleepByEmail(email);
    return res.status(200).json({ sleeps });
  } catch (err) {
    next(err);
  }
});


router.get("/maxsleep", async (req, res, next) => {
  try {
    const { email } = res.locals.user;
    const maxsleep = await User.getMaxSleep(email);
    return res.status(200).json({ maxsleep });
  } catch (err) {
    next(err);
  }
});


router.get("/avgcal", async (req, res, next) => {
  try {
    const { email } = res.locals.user;
    const avgcal = await User.getAvgCal(email);
    return res.status(200).json({ avgcal });
  } catch (err) {
    next(err);
  }
});

router.get("/totalE", async (req, res, next) => {
  try {
    const { email } = res.locals.user;
    const totalE = await User.getTotalE(email);
    return res.status(200).json({ totalE });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
