const { readData, writeData } = require("../utils/fileHandler");
const { findUserById, emailExists } = require("../services/userService");
const { v4: uuidv4 } = require('uuid');
const path = require("path");
const filePath = path.join(__dirname, "../data/users.json");

/**
 * @description Retrieves all user data from the users file and sends it as a response
 * @param {Object} req - express request object
 * @param {Object} res - express response object
 * @returns {void} - sends a response containing the array of users or an error message
 * @throws {Error} - responds with a 500 status code if an error occurs while reading the file
 */
const getData = (req, res) => {
  try {
    //reading users data from the file
    const users = readData(filePath);
    res.status(200).send({ message: "Request received successfully", users });
  } catch (err) {
    res.status(500).send({ error: "Internal Server Error", details: err.message });
  }
};

/**
 * @description Retrieves a specific user's data by their id from the users json file and sends it as a response
 * @param {Object} req - The Eepress request object, containing the user ID in params
 * @param {Object} res - The express response object
 * @returns {void} - sends a response containing the user's data if found or an error message if not
 * @throws {Error} - responds with a 500 status code if an error occurs while reading the file or finding the user
 */
const getDataById = (req, res) => {
  try {
    //reading users data from the file
    const users = readData(filePath);
    const user = findUserById(users, req.params.id);

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    res.status(200).send({ message: "Request received successfully", user });
  } catch (err) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

/**
 * @description Adds a new user to the users file after validating the provided data
 * @param {Object} req - The express request object containing user data (email, name, and age) in the request body.
 * @param {Object} res - The express response object
 * @returns {void} - Sends a success response with the added user's details or an error message if validation fails
 * @throws {Error} - responds with a 500 status code if an error occurs while reading or writing to the file
 */
const postData = (req, res) => {
  try {
    const { email, name, age } = req.body;

    //reading users data from the file
    const users = readData(filePath);

    //if there already exists an user with the email
    if (emailExists(users, email)) {
      return res.status(400).send({ error: "User with the email already exists" });
    }

    const newUser = { id: uuidv4(), email: email, name: name, age: age };
    users.push(newUser);

    //writing modified data into the file
    writeData(filePath, users);
    res.status(201).send({ message: "User added successfully", user: newUser });
  } catch (err) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

/**
 * @description Updates an existing user's data in the users file after validating the provided data.
 * @param {Object} req - The express request object
 * @param {Object} res - The express response object used to send back the result
 * @returns {void} - Sends a success response with the updated user's details or an error message if validation fails
 * @throws {Error} - Responds with a 500 status code if an error occurs while reading or writing to the file.
 */
const putData = (req, res) => {
  try {
    const id = req.params.id;
    const { email, name, age } = req.body;

    //reading users data from the file
    const users = readData(filePath);

    //if there already exists an user with the same email
    if (emailExists(users, email, id)) {
      return res.status(400).send({ error: "User with the same email already exists" });
    }

    //finding user with the given id
    const user = findUserById(users, id);

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

     // Update the user data
     user.email = email;
     user.name = name;
     user.age = age;

    //writing modified data into the file
    writeData(filePath, users);

    res.status(200).send({ message: "User updated successfully", user: user });
  } catch (err) {
    res.status(500).send({ error: `Internal Server Error: ${err.message}` });
  }
};

/**
 * @description deletes a user from the users file based on the given id
 * @param {Object} req - The express request object with the user id in the request params
 * @param {Object} res - The express response object
 * @returns {void} -sends a success response with the deleted user details or an error message.
 * @throws {Error} - responds with a 500 status code if an error occurs while reading or writing to the file
 */
const deleteData = (req, res) => {
  try {
    const id = req.params.id; // getting the user Id from the request parameters

    // Read the users data from the file
    let users = readData(filePath);

    // check if the user with the given id exists
    const userToDelete = findUserById(users, id);

    // If the user is not found
    if (!userToDelete) {
      return res.status(404).send({ error: "User not found" });
    }

    // Filter out the user with the given Id
    users = users.filter((user) => user.id !== id);


    //writing modified data into the file
    writeData(filePath, users);
    res.status(200).send({ message: "User deleted successfully", user: userToDelete });
  } catch (err) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

module.exports = {
    getData,
    getDataById,
    postData,
    putData,
    deleteData
}