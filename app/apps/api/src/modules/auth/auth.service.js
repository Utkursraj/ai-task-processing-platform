const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user.model");
const ApiError = require("../../utils/api-error");
const env = require("../../config/env");

async function registerUser({ email, password }) {
  const existing = await User.findOne({ email });
  if (existing) {
    throw new ApiError(400, "Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashedPassword,
  });

  return user;
}

function generateToken(user) {
  return jwt.sign(
    { userId: user._id },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn }
  );
}

async function loginUser({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(400, "Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ApiError(400, "Invalid credentials");
  }

  return user;
}

module.exports = {
  registerUser,
  loginUser,
  generateToken,
};