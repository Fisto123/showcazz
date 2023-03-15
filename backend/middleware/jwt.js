import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const verifyToken = (req, res, next) => {
  let JWT_KEY = "hfgdugsugsaskdkdototitdfkz";
  const token = req.cookies.accessToken;
  if (!token) return next(createError(401, "you are not verified"));

  jwt.verify(token, JWT_KEY, async (err, payload) => {
    if (err) return next(createError(403, "Token isnt valid"));
    req.userId = payload.id;
    req.isSeller = payload.isSeller;
    next();
  });
};
