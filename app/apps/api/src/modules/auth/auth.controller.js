const asyncHandler = require("../../utils/async-handler");
const {
  registerUser,
  loginUser,
  generateToken,
} = require("./auth.service");

const register = asyncHandler(async (req, res) => {
  const user = await registerUser(req.body);

  const token = generateToken(user);

  res.status(201).json({
    success: true,
    token,
  });
});

const login = asyncHandler(async (req, res) => {
  const user = await loginUser(req.body);

  const token = generateToken(user);

  res.status(200).json({
    success: true,
    token,
  });
});

module.exports = { register, login };