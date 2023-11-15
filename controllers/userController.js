const createError = require("http-errors");
const userModel = require("../models/userController");

exports.register = async (req, res, next) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    if (!email || !password) throw createError.BadRequest();

    const userExist = await userModel.findOne({ email });
    if (userExist) throw createError.Conflict(`${email} is already exist`);

    const user = await userModel.create({ email, password });

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};
exports.login = async (req, res, next) => {
  res.send("Login route");
};
exports.logout = async (req, res, next) => {
  res.send("Logout route");
};
exports.refereshToken = async (req, res, next) => {
  res.send("Referesh Token route");
};

exports.getUser = async (req, res, next) => {
  const user = await userModel.find();
  res.status(200).json(user);
};
