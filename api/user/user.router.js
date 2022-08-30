const router8 = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

const {
  createuser,
  login,
  getuserById,
  getuser,
  updateuser,
  deleteuser,
  editprofile,
  uploadFile,
} = require("./user.controller");



router8.post("/",createuser);

router8.get("/", checkToken, getuser);
router8.patch("/", checkToken, updateuser);
router8.delete("/", checkToken, deleteuser);

router8.get("/:id", checkToken, getuserById);
router8.post("/login", login);


router8.patch("/profile",checkToken, uploadFile, editprofile )

module.exports = router8;

