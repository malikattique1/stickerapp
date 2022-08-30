const router11 = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
  createuser_stickpack,
  // loginuser_stickpack,
  getuser_stickpackById,
  getuser_stickpack,
  updateuser_stickpack,
  deleteuser_stickpack
} = require("./user_stickpack.controller");

// router11.post("/",createuser_stickpack);
router11.post("/", checkToken, createuser_stickpack);
// router11.get("/", getuser_stickpack);
router11.get("/", checkToken, getuser_stickpack);
// router11.patch("/:id", updateuser_stickpack);
router11.patch("/:id", checkToken, updateuser_stickpack);
// router11.delete("/", deleteuser_stickpack);
router11.delete("/", checkToken, deleteuser_stickpack);

// router11.get("/:id", getuser_stickpackById);
router11.get("/:id", checkToken, getuser_stickpackById);
// router11.post("/login", loginuser_stickpack);


module.exports = router11;

