const fs = require("fs");

// ============ fucntion to read data from a users data file ============= //
/**
 * @description Reads data from a specified Json file and parses it into a javascript object
 * @param {string} filePath - The path to the Json file that contains the users data
 * @returns {Array} - Returns the parsed javascript data from the Json file
 * @throws {Error} - Throws an error if the file cannot be read or the content cannot be parsed
 */
function readData(filePath) {
    try {
      const data = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(data);
    } catch (err) {
      console.error("There is a problen in reading the file: ",err.message);
      throw new Error("Error in reading data to file")
    }
  }

  
  // ============== fuction to write data in users data file =============== //
  /**
 * @description Writes data to a specified Json file
 * @param {string} filePath - The path to the Json file where the data will be written
 * @param {Object} data - The data to be written to the file
 * @throws {Error} - Throws an error if the data cannot be written
 */
  function writeData(filePath, data) {
    try {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    } catch (err) {
      console.error("There is a problen in writing the file: ",err.message);
      throw new Error("Error in writing data to file")
    }
  }

  module.exports = {
    readData,
    writeData
  }