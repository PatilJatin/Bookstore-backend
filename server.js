import express from "express";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import { connectWithDB } from "./config/database.js";

const app = express();
const { PORT } = process.env;

//connnect with DB
connectWithDB();

//regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//morgan middleware
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.status(200).send("Working");
});

app.listen(PORT, () => {
  console.log(`server started at ${PORT}...`);
});
