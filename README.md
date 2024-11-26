# Node.js Assignment

A simple API built with Node.js and Express for managing user data. This API allows users to perform CRUD operations (Create, Read, Update, Delete) on user data stored in a JSON file. It includes functionality for validating user data, checking if an email already exists, and handling errors.

---

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [GET /users](#get-users)
  - [GET /users/:id](#get-user-by-id)
  - [POST /users](#create-new-user)
  - [PUT /users/:id](#update-user-by-id)
  - [DELETE /users/:id](#delete-user-by-id)
- [Error Handling](#error-handling)
- [Environment Variables](#environment-variables)


---

## Pre-requisites

Before running this project, ensure the following:

- Node.js: Version 16 or higher is installed
- npm: Comes with Node.js installation and is required for managing packages.
- Git: To clone the repository, install Git from Git Official Website.
- nodemon: Optional, for development purposes, allows the server to reload automatically on file changes. Install it globally using:
    ```bash
    npm install -g nodemon
    ```

## Installation

Follow these steps to set up the project locally:

1. Clone the repository:
    ```bash
    git clone https://github.com/Aanchal-Saxena/node_api_handling.git
    ```

2. Navigate to the project folder:
    ```bash
    cd node_api_handling
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Create a `.env` file in the root directory to store environment variables (e.g., port):
    ```bash
    PORT=3001
    ```

5. Start the application in development mode using `nodemon` (recommended for auto-reloading):
    ```bash
    npm run dev
    ```

    Alternatively, you can start it using:
    ```bash
    npm start
    ```

---

## Usage

The API allows you to manage user data via several HTTP endpoints. It supports operations such as creating, retrieving, updating, and deleting user records. The data is stored in a local `users.json` file.

---

## API Endpoints

### GET /users

Fetches all users from the data file.

**Response:**
- Returns a list of all users with their details.

---

### GET /users/:id

Fetches a user by their unique `id`.

**Parameters:**
- `id`: The ID of the user.

**Response:**
- Returns the user details for the specified ID.

---

### POST /users/create

Creates a new user. Requires `email`, `name`, and `age` in the request body.

**Request Body:**
- `email`: Email address of the user (must be unique)
- `name`: Name of the user
- `age`: Age of the user (cannot be negative)

- Schema 
  ``` json
    {
    "email": "aanchal@example.com",
    "name": "Aanchal",
    "age": 30
  }
  ```

**Response:**
- Returns a success message and the details of the newly created user.

---

### PUT /users/update/:id

Updates an existing user's data by their `id`. Requires `email`, `name`, and `age` in the request body.

**Parameters:**
- `id`: The unique ID of the user.

**Request Body:**
- `email`: Email address of the user (must be unique)
- `name`: Name of the user
- `age`: Age of the user (cannot be negative)

- Schema 
  ``` json
    {
    "email": "aanchal@example.com",
    "name": "Aanchal",
    "age": 22
  }
  ```

**Response:**
- Returns a success message and the updated user details.

---

### DELETE /users/remove/:id

Deletes a user by their `id`.

**Parameters:**
- `id`: The ID of the user.

**Response:**
- Returns a success message and the details of the deleted user.

---

## Schema for JSON File 

The `users.json` file stores the user data in the following format:

``` json
[
  {
    "id": "6dc622c0-f2b2-47f4-9a23-6d462b521b01",
    "email": "percy@blue.com",
    "name": "Percy",
    "age": 18
  },
  {
    "id": "1fc622c0-f2b2-47f4-9a23-6d462b521b11",
    "email": "meow@woof.com",
    "name": "Kiwi",
    "age": 25
  }
]
```

- `id`: Unique identifier for all users (generated automatically while creating a new user using `uuid`)
- `email`: Email address of the user (must be unique)
- `name`: Name of the user
- `age`: Age of the user (cannot be negative)

---

## Error Handling

- **404 Not Found**: If the requested user or route is not found, the response will be a `404` with an appropriate error message.
- **400 Bad Request**: If there is an issue with the input data (e.g., email already exists), the response will be a `400` with an error message.
- **500 Internal Server Error**: If an unexpected error occurs while processing the request, a `500` error will be returned with an error message.

---

## Environment Variables

- `PORT`: The port on which the server will run. Defaults to `3001` if not specified.


---

### Conclusion

This Node.js API provides basic user management features and can be extended to include additional features like authentication, more complex validations, and more data storage solutions like a database. It is easily scalable with modular architecture.

---
