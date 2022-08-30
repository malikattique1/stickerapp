
var config = require('../../config.js'); // get our config file
const {
  createuser_stickpack,
  loginuser_stickpack,
  getuser_stickpackById,
  getuser_stickpack,
  updateuser_stickpack,
  deleteuser_stickpack
} = require("./user_stickpack.service");

const { sign } = require("jsonwebtoken");
module.exports = {
  loginuser_stickpack: (req, res) => {
    const body = req.body;
    loginuser_stickpack(body.id, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          data: "Invalid userid/email or password"
        });
      }
      console.log(results);
      if ((body.owner === results.owner)) {
        const jsontoken = sign({ result: results }, config.secret, {
          expiresIn: 86400
        });
        return res.json({
          success: 1,
          message: "login successfully",
          token: jsontoken
        });
      } else {
        return res.json({
          success: 0,
          data: "Invalid user_id/email or passwordsss"
        });
      }
    });
  },
  createuser_stickpack: (req, res) => {
    const body = req.body;
    createuser_stickpack(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },
  getuser_stickpackById: (req, res) => {
    const id = req.params.id;
    getuser_stickpackById(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not Found"
        });
      }
      return res.json({
        success: 1,
        data: results
      });
    });
  },
  getuser_stickpack: (req, res) => {
    getuser_stickpack((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results
      });
    });
  },
  updateuser_stickpack: (req, res) => {
    const id = req.params.id;
console.log(id);
    const body = req.body;
    updateuser_stickpack(body,id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "updated successfully"
      });
    });
  },
  deleteuser_stickpack: (req, res) => {
    const data = req.body;
    deleteuser_stickpack(data, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (results) {
        return res.json({
          success: 0,
          message: "Record Not Found"
        });
      }
      return res.json({
        success: 1,
        message: "deleted successfully"
      });
    });
  }
};
