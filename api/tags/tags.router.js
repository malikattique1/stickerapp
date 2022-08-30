// const router = require("express").Router();
const router3 = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
  createTags,
  // loginTags,
  getTagsById,
  getTags,
  updateTags,
  deleteTags
} = require("./tags.controller");

// router3.post("/",createTags);
router3.post("/", checkToken, createTags);
// router3.get("/", getTags);
router3.get("/", checkToken, getTags);
// router3.patch("/:id", updateTags);
router3.patch("/:id", checkToken, updateTags);
// router3.delete("/", deleteTags);
router3.delete("/", checkToken, deleteTags);

// router3.get("/:id", getTagsById);
router3.get("/:id", checkToken, getTagsById);
// router3.post("/login", loginTags);


module.exports = router3;

