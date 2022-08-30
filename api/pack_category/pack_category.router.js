const router9 = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
  createpack_category,
  // loginpack_category,
  getpack_categoryById,
  getpack_category,
  updatepack_category,
  deletepack_category
} = require("./pack_category.controller");

// router9.post("/",createpack_category);
router9.post("/", checkToken, createpack_category);
// router9.get("/", getpack_category);
router9.get("/", checkToken, getpack_category);
// router9.patch("/:id", updatepack_category);
router9.patch("/:id", checkToken, updatepack_category);
// router9.delete("/", deletepack_category);
router9.delete("/", checkToken, deletepack_category);

// router9.get("/:id", getpack_categoryById);
router9.get("/:id", checkToken, getpack_categoryById);
// router9.post("/login", loginpack_category);

module.exports = router9;

