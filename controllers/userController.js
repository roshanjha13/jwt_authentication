const createError = require("http-errors");
const userModel = require("../models/userController");
const { authSchema } = require("../validation/validation_schema");
const { signAccessToken } = require("../utils/jwt_utils");

exports.register = async (req, res, next) => {
  try {
    const result = await authSchema.validateAsync(req.body);
    const userExist = await userModel.findOne({ email: result.email });
    if (userExist)
      throw createError.Conflict(`${result.email} is already exist`);

    const user = new userModel(result);
    const users = await user.save();

    const accessToken = await signAccessToken(users.id);

    res.status(201).json({ data: user, token: accessToken });
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const result = await authSchema.validateAsync(req.body);
    const user = await userModel.findOne({ email: result.email });
    if (!user)
      throw createError.NotFound(
        `This ${result.email} mail is not register please register before login`
      );

    const isMatch = await user.isValidPassword(result.password);

    if (!isMatch)
      throw createError.Unauthorized("Useremail/Password is not valid");

    const accessToken = await signAccessToken(user.id);
    res.status(200).json({
      data: user,
      message: `${result.email} is logged in successfully`,
      token: accessToken,
    });
  } catch (error) {
    if (error.isJoi === true)
      return next(createError.BadRequest("Inavlid user name and password"));
    next(error);
  }
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
