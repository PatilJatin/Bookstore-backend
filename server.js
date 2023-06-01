import express from "express";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";

const app = express();
const { PORT } = process.env;

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
