import User from "../model/user.model.js";
import { createError } from "../utils/error.js";
export const deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  console.log(req.userId);
  if (req.userId !== user._id.toString()) {
    return next(createError(403, "You can only delete your account"));
  }
  await User.findByIdAndDelete(req.params.id);
  res.status(200).send("user deleted");
};

export const getUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(200).send(user);
};

export const getUsers = async (req, res, next) => {
  const users = await User.find();
  res.status(200).send(users);
};
