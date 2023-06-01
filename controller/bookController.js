import Book from "../model/book.js";
import ErrorHandler from "../util/ErrorHandler.js";
import AsynchHandler from "../middleware/AsynchHandler.js";
import cloudinary from "cloudinary";

export const addBook = AsynchHandler(async (req, res, next) => {
  let imageArray = [];
  if (!req.files) {
    return next(new ErrorHandler("Book images are required", 401));
  }
  if (req.files) {
    for (let index = 0; index < req.files.images.length; index++) {
      let result = await cloudinary.v2.uploader.upload(
        req.files.images[index].tempFilePath,
        {
          folder: "Books",
        }
      );
      imageArray.push({
        id: result.public_id,
        secure_url: result.secure_url,
      });
    }
  }
  req.body.images = imageArray;
  const product = await Book.create(req.body);
  res.status(200).json({
    message: "success",
    product,
  });
});

export const deleteOneBook = AsynchHandler(async (req, res, next) => {
  let book = await Book.findById(req.params.id);
  if (!book) {
    return next(new ErrorHandler("There is no such product of this Id", 404));
  }

  for (let index = 0; index < book.images.length; index++) {
    await cloudinary.v2.uploader.destroy(book.images[index].id);
  }

  await book.deleteOne();
  res.status(200).json({
    message: "Success",
  });
});

export const getAllBooks = AsynchHandler(async (req, res, next) => {
     const books = await Book.find();
     if(!books){
         return next(new ErrorHandler("Books not available", 401));
     }
     res.status(200).json({
       success: true,
       data: books,
     });
});

export const getOneBook = AsynchHandler(async (req, res, next) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    return next(new ErrorHandler("There is no such product of this Id", 404));
  }
  res.status(200).json({
    message: "Success",
    book,
  });
});
