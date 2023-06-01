import User from "../model/user.js";
import AsynchHandler from "./AsynchHandler.js";
import ErrorHandler from "../util/ErrorHandler.js";
import jwt from "jsonwebtoken";

 const isLoggedIn = AsynchHandler(async (req, res, next) => {
  const token =
    req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return next(new ErrorHandler("Please log in first", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findOne({ _id: decoded.id });
    next();
  } catch (error) {
    return next(new ErrorHandler("Invalid token", 401));
  }
});

export default isLoggedIn;