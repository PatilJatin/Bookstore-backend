import express from "express";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import { connectWithDB } from "./config/database.js";
import cloudinary from "cloudinary";
import user from "./route/user.js";
import book from "./route/book.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

const app = express();
const { PORT } = process.env;

//connnect with DB
connectWithDB();

//regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//morgan middleware
app.use(morgan("tiny"));

//cookie and file middleware
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

//coludinary configurtion
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET,
});

//router middleware
app.use("/api/v1", user);
app.use("/api/v1", book);
app.get("/", (req, res) => {
  res.status(200).send("Working");
});

app.listen(PORT, () => {
  console.log(`server started at ${PORT}...`);
});
