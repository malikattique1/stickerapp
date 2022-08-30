const router5 = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
  createtags_stickers,
  // logintags_stickers,
  gettags_stickersById,
  gettags_stickers,
  updatetags_stickers,
  deletetags_stickers
} = require("./tags_stickers.controller");

// router5.post("/",createtags_stickers);
router5.post("/", checkToken, createtags_stickers);
// router5.get("/", gettags_stickers);
router5.get("/", checkToken, gettags_stickers);
// router5.patch("/:id", updatetags_stickers);
router5.patch("/:id", checkToken, updatetags_stickers);
// router5.delete("/", deletetags_stickers);
router5.delete("/", checkToken, deletetags_stickers);

// router5.get("/:id", gettags_stickersById);
router5.get("/:id", checkToken, gettags_stickersById);
// router5.post("/login", logintags_stickers);

module.exports = router5;

