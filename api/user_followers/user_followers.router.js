const router10 = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
  createuser_followers,
  // loginuser_followers,
  getuser_followersById,
  getuser_followers,
  updateuser_followers,
  deleteuser_followers,
  suggestedfollowers
} = require("./user_followers.controller");

// router10.post("/",createuser_followers);
router10.post("/follow", checkToken, createuser_followers);
// router10.get("/", getuser_followers);
router10.get("/", checkToken, getuser_followers);
// router10.patch("/:id", updateuser_followers);
router10.patch("/:id", checkToken, updateuser_followers);
// router10.delete("/", deleteuser_followers);
router10.delete("/unfollow", checkToken, deleteuser_followers);

// router10.get("/:id", getuser_followersById);
router10.get("/:id", checkToken, getuser_followersById);
// router10.post("/login", loginuser_followers);
router10.get("/suggestedfollowers/:id", checkToken, suggestedfollowers);

module.exports = router10;

