const router = require("express").Router();
const { validateUserData, validateId } = require("../middlewares/users.validator")
const {
  getData,
  getDataById,
  postData,
  putData,
  deleteData,
} = require("../controllers/users.controller");

// ================ API to get all user details =================== //
router.get("/", getData);

// ============== API to get user with a specific Id =================== //
router.get("/:id", getDataById);

// ============= API to post new user data =================== //
router.post("/create", validateUserData, postData);

// ===================== API to update user data with a given ID ======================= //
router.put("/update/:id", validateUserData, validateId, putData);

// ================= API to delete a user ======================= //
router.delete("/remove/:id", validateId, deleteData);

// Exporting router
module.exports = router;
