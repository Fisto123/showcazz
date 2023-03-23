import User from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";
let JWT_KEY = "hfgdugsugsaskdkdototitdfkz";
export const createUser = async (req, res) => {
  res.send("hello");
};

export const register = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) return next(createError(404, "email already exists"));
    const hashedPassword = bcrypt.hashSync(req.body.password, 5);
    const newUser = new User({
      ...req.body,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).send("user has been created");
  } catch (error) {
    next();
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "email doesnt exist"));
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(404, "password not correct"));
    const token = jwt.sign(
      {
        id: user._id.toString(),
        isSeller: user.isSeller,
      },
      JWT_KEY
    );
    const { password, ...info } = user._doc;
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        secure:true,
      sameSite:"none"
      })
      .status(200)
      .send(info);
  } catch (error) {
    return next(createError(error));
  }
};
export const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("user has been logged out");
};
