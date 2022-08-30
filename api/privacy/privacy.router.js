const router6 = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
  createprivacy,
  loginprivacy,
  getprivacyById,
  getprivacy,
  updateprivacy,
  deleteprivacy
} = require("./privacy.controller");

// router6.post("/",createprivacy);
router6.post("/", checkToken, createprivacy);
// router6.get("/", getprivacy);
router6.get("/", checkToken, getprivacy);
// router6.patch("/:id", updateprivacy);
router6.patch("/:id", checkToken, updateprivacy);
// router6.delete("/", deleteprivacy);
router6.delete("/", checkToken, deleteprivacy);

// router6.get("/:id", getprivacyById);
router6.get("/:id", checkToken, getprivacyById);
router6.post("/login", loginprivacy);

module.exports = router6;

