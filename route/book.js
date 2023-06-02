import express from "express";
import {
  addBook,
  deleteOneBook,
  getAllBooks,
  getOneBook,
} from "../controller/bookController.js";
const router = express.Router();
import isLoggedIn from "../middleware/user.js";

router.route("/getAllBooks").get(getAllBooks);
router.route("/getOneBook/:id").get(getOneBook);
router.route("/addBook").post(isLoggedIn, addBook);
router.route("/deleteBook/:id").delete(isLoggedIn, deleteOneBook);

export default router;
