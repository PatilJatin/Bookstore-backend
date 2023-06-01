import express from "express";
import {
  signup,
  login,
  logout,
  getLoggedInUserDetails,
} from "../controller/userController.js";
import isLoggedIn from "../middleware/user.js";
const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/userdashboard").get(isLoggedIn, getLoggedInUserDetails);

export default router;
