const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
  createSticker,
  login,
  getStickerByUserId,
  getStickers,
  updateSticker,
  deleteSticker,
  getStickerByStickername,
  topfree,
  toppaid,
  popularstickers,
  suggestedstickers,
  addedtowhatsapp,
  interestedstickers,
  updateStickerorderinpack
} = require("./sticker.controller");

router.get("/", checkToken, getStickers);
router.post("/", checkToken, createSticker);
router.patch("/", checkToken, updateSticker);
router.delete("/", checkToken, deleteSticker);


router.get("/details/:id", checkToken, getStickerByUserId);
// router.post("/login", login);
router.get("/search/:name", checkToken, getStickerByStickername);

router.get("/topfree", checkToken, topfree);
router.get("/toppaid", checkToken, toppaid);
router.get("/popularstickers", checkToken, popularstickers);
router.get("/suggestedstickers", checkToken, suggestedstickers);

router.post("/addedtowhatsapp", checkToken, addedtowhatsapp);
router.get("/interestedstickers", checkToken, interestedstickers);

router.patch("/order/:id", checkToken, updateStickerorderinpack);









module.exports = router;
