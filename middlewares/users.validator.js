// ============== function to find user by Id ================ //
/**
 * @summary middleware to validate user data
 * @param {Array} users - The array of users to search
 * @param {Object} req - express request object
 * @param {Object} res - express response object
 * @returns {void} - Sends 400 status code and error message if the data is not valid
 * @throws {Error} - responds with a 500 status code if an error occurs while validating data
 */
const validateUserData = (req, res, next) => {
  try {
    const { email, name, age, ...otherKeys } = req.body;

    // Check if there are any extra fields in the request body
    if (Object.keys(otherKeys).length > 0) {
      return res.status(400).send({ error: "Request contains invalid fields" });
    }

    // Validate email - required, must be a string, and follow a valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email)) {
      return res.status(400).send({ error: "Valid email is required" });
    }

    // Validate name - and check if its a string
    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).send({ error: "Name is required and must be a non-empty string" });
    }

    // Validate age - required, must be a positive integer
    if (!age || typeof age !== "number" || age < 1) {
      console.log("Age type", typeof age)
      return res.status(400).send({error: "Age is required, must be a number, and greater than zero"});
    }
    // If validation passes, proceed to the next middleware or route handler
    next();
  } catch (err) {
    // Handle any unexpected errors
    res
      .status(500)
      .send({ error: "Internal Server Error", details: err.message });
  }
};

/**
 * @summary middleware to check if id parameter is present in request
 * @param {Array} users - The array of users to search
 * @param {Object} req - express request object
 * @param {Object} res - express response object
 * @returns {void} - Sends 400 status code and error message if if id is not present
 * @throws {Error} - responds with a 500 status code if an error occurs while validating data
 */
const validateId = (req, res, next) => {
    try {
      const { id } = req.params;
  
      // Check if the id parameter is present
      if (!id) {
        return res.status(400).send({ error: "Id parameter is required" });
      }
      // If validation passes, proceed to the next middleware or route handler
      next();
    } catch (err) {
      // Handle any unexpected errors
      res.status(500).send({ error: "Internal Server Error", details: err.message });
    }
  };

module.exports = { validateUserData, validateId };
