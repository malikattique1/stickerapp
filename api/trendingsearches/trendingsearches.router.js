const router3 = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
  createtrending_searches,
  // logintrending_searches,
  gettrending_searchesById,
  gettrending_searches,
  updatetrending_searches,
  deletetrending_searches
} = require("./trendingsearches.controller");

// router3.post("/",createtrending_searches);
router3.post("/", checkToken, createtrending_searches);
// router3.get("/", gettrending_searches);
router3.get("/", checkToken, gettrending_searches);
// router3.patch("/:id", updatetrending_searches);
router3.patch("/:id", checkToken, updatetrending_searches);
// router3.delete("/", deletetrending_searches);
router3.delete("/", checkToken, deletetrending_searches);

// router3.get("/:id", gettrending_searchesById);
router3.get("/:id", checkToken, gettrending_searchesById);
// router3.post("/login", logintrending_searches);
module.exports = router3;

