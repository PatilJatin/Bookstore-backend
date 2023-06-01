import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide the name"],
    maxLength: [50, "Name shoulb be under 50 Characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide the email"],
    validate: [validator.isEmail, "Please enter Email in correct format"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide the password"],
    minLength: [8, "password should be atleast 8 character"],
    select: false,
  },
  photo: {
    id: {
      type: String,
      required: true,
    },
    secure_url: {
      type: String,
      default:
        "https://eliaslealblog.files.wordpress.com/2014/03/user-200.png?w=700",
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//encrypt password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//validate the password with passedon user password
userSchema.methods.isValidatedPassword = async function (userSendPasswrord) {
  return await bcrypt.compare(userSendPasswrord, this.password);
};

//create and return JWT token
userSchema.methods.getToken = async function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRY,
    }
  );
};

export default mongoose.model("User", userSchema);
