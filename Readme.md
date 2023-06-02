# Book Haven

The project name is [Project Name]. It is a [brief description of your project].

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Installation

1. Clone the repository.
2. Install the dependencies using the following command:

## Usage

1. Set up the environment variables by creating a `.env` file. Refer to `.env.example` for the required variables.
2. Start the server using the following command:
3.The server will run on `http://localhost:[PORT]`, where `[PORT]` is the specified port in the `.env` file.

## API Endpoints

### User Routes

#### Signup

- **Endpoint:** `/api/v1/signup`
- **Method:** `POST`
- **Description:** Create a new user account.
- **Request Body:**
- `username` (string): User's username
- `password` (string): User's password
- **Response:**
- `message` (string): Success message or error message

#### Login

- **Endpoint:** `/api/v1/login`
- **Method:** `POST`
- **Description:** User login.
- **Request Body:**
- `username` (string): User's username
- `password` (string): User's password
- **Response:**
- `message` (string): Success message or error message
- `token` (string): Access token for authenticated requests

#### Logout

- **Endpoint:** `/api/v1/logout`
- **Method:** `GET`
- **Description:** User logout.
- **Response:**
- `message` (string): Success message or error message

#### User Dashboard

- **Endpoint:** `/api/v1/userdashboard`
- **Method:** `GET`
- **Description:** Get the details of the logged-in user.
- **Request Headers:**
- `Authorization` (string): Access token
- **Response:**
- `username` (string): User's username
- `email` (string): User's email
- `otherDetails` (object): Additional details of the user

### Book Routes

#### Get All Books

- **Endpoint:** `/api/v1/getAllBooks`
- **Method:** `GET`
- **Description:** Get a list of all books.
- **Response:**
- `books` (array): Array of book objects

#### Get One Book

- **Endpoint:** `/api/v1/getOneBook/:id`
- **Method:** `GET`
- **Description:** Get the details of a specific book.
- **Request Parameters:**
- `id` (string): ID of the book
- **Response:**
- `book` (object): Details of the book

#### Add Book

- **Endpoint:** `/api/v1/addBook`
- **Method:** `POST`
- **Description:** Add a new book.
- **Request Body:**
- `title` (string): Title of the book
- `author` (string): Author of the book
- `description` (string): Description of the book
- **Request Headers:**
- `Authorization` (string): Access token
- **Response:**
- `message` (string): Success message or error message

#### Delete Book

- **Endpoint:** `/api/v1/deleteBook/:id`
- **Method:** `DELETE`
- **Description:** Delete a specific book.
- **Request Body:**
- `title` (string): Title of the book
- `author` (string): Author of the book
- `description` (string): Description of the book
- **Request Parameters:**
- `id` (string): ID of the book
- **Request Headers:**
- `Authorization` (string): Access token
- **Response:**
- `message` (string): Success message or error message
