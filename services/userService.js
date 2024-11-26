// ============== function to find user by Id ================ //
/**
 * @summary Finds a user in the list by their unique Id
 * @param {Array} users - The array of users to search
 * @param {string} id - The unique Id of the user to find
 * @returns {Object|null} - Returns the user object if found or null if not found
 * @throws {Error} - If the user is not found or if an error occurs during the operation
 */
const findUserById = (users, id) => {
  try {
   // Find the user with the given id
   const user = users.find((user) => user.id === id);
   // Return null if the user is not found
   return user || null;
  } catch (err) {
    console.error("There is a probles in finding the user: ", err.message);
    throw new Error("Error occurred while fetching user data");
  }
};

// ============== Function to check if a user with the same email already exists ================ //
/**
 * @description Checks if a user with the given email already exists in the users list
 * @param {Array} users - The array of user objects to search
 * @param {string} email - The email of the user to check
 * @param {string} [id] - (Optional) The unique Id of the user to exclude from the check
 * @returns {boolean} - Returns true if a user with the same email exists and false otherwise
 * @throws {Error} - throws an error if an issue occurs during the validation process.
 */
const emailExists = (users, email, id = null) => {
  try {
    return users.some((user) => user.email === email && user.id != id);
  } catch (err) {
    console.error("Error while checking if the email exists: ", err.message);
    throw new Error("Error occurred during the validation check");
  }
};

module.exports = { emailExists };


module.exports = { findUserById, emailExists };
