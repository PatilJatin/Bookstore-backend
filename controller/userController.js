import User from "../model/user.js";
import AsynchHandler from "../middleware/AsynchHandler.js";
import ErrorHandler from "../util/ErrorHandler.js";
import cookieToken from "../util/cookieToken.js";
import cloudinary from "cloudinary";

export const signup = AsynchHandler(async (req, res, next) => {
  if (!req.files) {
    return next(new ErrorHandler("photo is required for signup", 400));
  }

  const { name, email, password } = req.body;

  if (!email || !name || !password) {
    return next(new ErrorHandler("Email, Name and Password required", 400));
  }

  let file = req.files.photo;
  const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
    folder: "users",
    width: 150,
    crop: "scale",
  });

  const user = await User.create({
    name,
    email,
    password,
    photo: {
      id: result?.public_id,
      secure_url: result?.secure_url,
    },
  });

  cookieToken(user, res);
});

export const login = AsynchHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //check for presence of email and password
  if (!email || !password) {
    return next(new ErrorHandler("Please provide email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(
      new ErrorHandler("Email or Password does not match or exist", 400)
    );
  }

  const isPasswordCorrect = await user.isValidatedPassword(password);

  if (!isPasswordCorrect) {
    return next(
      new ErrorHandler("Email or Password does not match or exist", 400)
    );
  }

  cookieToken(user, res);
});

export const logout = AsynchHandler(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
    sameSite: "Lax",
    secure: false,
  });
  res.status(200).json({
    message: "Logout success",
  });
});

export const getLoggedInUserDetails = AsynchHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    message: "success",
    user,
  });
});
