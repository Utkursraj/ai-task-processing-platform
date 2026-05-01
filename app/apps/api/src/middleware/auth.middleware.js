const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const ApiError = require("../utils/api-error");
const asyncHandler = require("../utils/async-handler");
const env = require("../config/env");

const authMiddleware = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    throw new ApiError(401, "Unauthorized: token missing");
  }

  const token = header.split(" ")[1];

  const decoded = jwt.verify(token, env.jwtSecret);

  const user = await User.findById(decoded.userId).select("-password");

  if (!user) {
    throw new ApiError(401, "Unauthorized: user not found");
  }

  req.user = user;
  next();
});

module.exports = authMiddleware;