const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const filePath = path.join(__dirname, "../data/users.json");
  
// ============== function to find user by Id ================ //
const findUserById = (users, id) => {
    const index = users.findIndex((user) => user.id === id);
    return index !== -1 ? users[index] : null;
  };
  

// ============ fucntion to read data from a users data file ============= //
function readData(filePath) {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return [];
  }
}

// ============== fuction to write data in users data file =============== //
function writeData(path, data) {
  try {
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(err);
  }
}

// ================ API to get all user details =================== //
router.get("/", (req, res) => {
    try {

      //reading users data from the file  
      const users = readData(filePath);
      res.status(200).send({ message: "Request received successfully", users });
    } catch (err) {
      res.status(500).send({ error: "Internal Server Error", details: err.message });
    }
  });
  
  // ============== API to get user with a specific Id =================== //
  router.get("/:id", (req, res) => {
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
  });
  
  // ============= API to post new user data =================== //  
  router.post("/", (req, res) => {
    try {
        const name =  req.body.name.toString();
        const age = parseInt(req.body.age);

     //if name or age field is missing in the request body
      if((!name) || (!age)) {
        return res.status(400).send({ error: "Missing field or wrong format" });
      }

      //handling invalid age
      if(age<1) {
        return res.status(400).send({ error: "Age cannot be negative or zero" });
      }
      //reading users data from the file 
      const users = readData(filePath);

      //if there already exists an user with the same name and age
      const exists = users.some((user) => user.name === name && user.age === age);
  
      if (exists) {
        return res.status(400).send({ error: "User with the same name and age already exists" });
      }
  
      const newUser = { id: uuidv4(), name: name, age: age };
      users.push(newUser);

      //writing modified data into the file
      writeData(filePath, users);
      res.status(201).send({ message: "User added successfully", user: newUser });
    } catch (err) {
      res.status(500).send({ error: "Internal Server Error" });
    }
  });
  
  // ===================== API to update user data with a given ID ======================= //
  router.put("/:id", (req, res) => {
    try {
      const id = req.params.id;
      const name =  req.body.name.toString();
      const age = parseInt(req.body.age);

      //if id is not present in the request params
      if (!id) {
        return res.status(400).send({ error: "Id parameter is required" });
      }

      //if name or age field is missing in the request body
      if((!name) || (!age)) {
        return res.status(400).send({ error: "Missing field or wrong data format" });
      }

       //handling invalid age
       if(age<1) {
        return res.status(400).send({ error: "Age cannot be negative" });
      }

      //reading users data from the file  
      const users = readData(filePath);

      //finding user with the given id
      const index = users.findIndex((user) => user.id === id);
  
      //if user with the given id is not found
      if (index === -1) {
        return res.status(404).send({ error: "User not found" });
      }
  
      //modifying user data
      users[index] = { id, name: name, age: age };

      //writing modified data into the file
      writeData(filePath, users);
      res.status(200).send({ message: "User updated successfully", user: users[index] });
    } catch (err) {
      res.status(500).send({ error: "Internal Server Error" });
    }
  });
  
  // ================= API to delete a user ======================= //
  router.delete("/:id", (req, res) => {
    try {
      const id = req.params.id;

      //if the id is not present in the request params
      if (!id) {
        return res.status(400).send({ error: "Id parameter is required" });
      }
  
      //reading users data from the file  
      let users = readData(filePath);

      //finding the index of the user with the given id
      const index = users.findIndex((user) => user.id === id);
  
      //if user with given id is not found in the file
      if (index === -1) {
        return res.status(404).send({ error: "User not found" });
      }
  
      //deleting the user from the array
      const deletedUser = users.splice(index, 1)[0];

      //writing modified data into the file
      writeData(filePath, users);
      res.status(200).send({ message: "User deleted successfully", user: deletedUser });
    } catch (err) {
      res.status(500).send({ error: "Internal Server Error" });
    }
  });
  
  // Exporting router
  module.exports = router;