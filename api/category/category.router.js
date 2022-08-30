const router7 = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
  createcategory,
  logincategory,
  getcategoryById,
  getcategory,
  updatecategory,
  deletecategory
} = require("./category.controller");

router7.post("/",createcategory);
router7.post("/", checkToken, createcategory);
// router7.get("/", getcategory);
router7.get("/", checkToken, getcategory);
router7.patch("/:id", updatecategory);
router7.patch("/:id", checkToken, updatecategory);
// router7.delete("/", deletecategory);
router7.delete("/", checkToken, deletecategory);

// router7.get("/:id", getcategoryById);
router7.get("/:id", checkToken, getcategoryById);
// router7.post("/login", logincategory);

module.exports = router7;

