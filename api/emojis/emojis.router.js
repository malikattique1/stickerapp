const router12 = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
  createemojis,
  getemojisById,
  getemojis,
  updateemojis,
  deleteemojis
} = require("./emojis.controller");


// router12.post("/",createTags);
router12.post("/", checkToken, createemojis);
// 12.get("/", getTags);
router12.post("/getemojis", checkToken, getemojis);
// router12.patch("/:id", updateTags);
router12.patch("/:id", checkToken, updateemojis);
// router12.delete("/", deleteTags);
router12.delete("/", checkToken, deleteemojis);

// router3.get("/:id", getTagsById);
router12.get("/:id", checkToken, getemojisById);
// router12.post("/login", loginTags);


module.exports = router12;

