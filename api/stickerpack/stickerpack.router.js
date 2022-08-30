const router2 = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
  createStickerpack,
  uploadFile,
  getStickerpackByCategory,
  getStickerpackByid,
  getStickerspack,
  updateStickerpack,
  deleteStickerpack
} = require("./stickerpack.controller");


router2.post("/", checkToken,uploadFile,createStickerpack);

router2.get("/", checkToken, getStickerspack);

router2.patch("/", checkToken,uploadFile, updateStickerpack);

router2.delete("/", checkToken, deleteStickerpack);

router2.get("/:category", checkToken, getStickerpackByCategory);

router2.get("/details/:id", checkToken, getStickerpackByid);

module.exports = router2;

