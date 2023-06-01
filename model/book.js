import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name for book"],
    trim: true,
    maxLength: [50, "Book name should not be more than 100 characters"],
  },
  price: {
    type: Number,
    required: [true, "please provide price for Book"],
    maxLength: [4, "Book price should not be more than 4 digits"],
  },
  description: {
    type: String,
    required: [true, "please provide description for Book"],
    maxLength: [400, "Book description should not be more than 400 characters"],
  },
  images: [
    {
      id: {
        type: String,
        required: true,
      },
      secure_url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "please select category for Book"],
    enum: {
      values: [
        "Biograpthy",
        "Memoir",
        "Historical",
        "Art",
        "Business",
        "Comics",
        "Health & Fitness",
      ],
      message:
        'Please select prove category from "Biograpthy","Memoir","Historical","Art","Business","Comics","Health & Fitness"',
    },
  },
  author: {
    type: String,
    required: [true, "Please add author-name for product"],
  },
  stock: {
    type: Number,
    required: [true, "Please provide add a number in stock"],
  },
  featured: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Book", bookSchema);
