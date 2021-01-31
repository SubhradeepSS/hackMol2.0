const College = require("../models/college");

exports.createCollege = async (req, res, next) => {
  try {
    const name = req.body.name;
    const address = req.body.address;

    const college = await new College({ name, address });
    await college.save();

    return res.status(201).json({
      success: true,
      message: "College created successfully!",
      college: college,
    });
  } catch (err) {
    if (err.message) return res.status(500).json({ message: err.message });
    else return res.status(500).json({ message: "Something Went Wrong!" });
  }
};

const { validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.collegeSignup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed.");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  bcrypt
    .hash(password, 12)
    .then((hashedPw) => {
      const user = new User({
        email: email,
        password: hashedPw,
        name: name,
      });
      return user.save();
    })
    .then((result) => {
      res.status(201).json({ message: "User created!", userId: result._id });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.collegeLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  // console.log(email, password);

  let loadedCollege;
  College.findOne({ email: email })
    .then((college) => {
      if (!college) {
        const error = new Error(
          "A College with this email could not be found."
        );
        error.statusCode = 401;
        throw error;
      }
      loadedCollege = college;
      return bcrypt.compare(password, college.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Wrong password!");
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedCollege.email,
          collegeId: loadedCollege._id.toString(),
        },
        "somesupersecretsecret",
        { expiresIn: "12h" }
      );
      res.cookie("token", token, { maxAge: 3600000000, httpOnly: true });
      res
        .status(200)
        .json({ token: token, collegeId: loadedCollege._id.toString() });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
