
var config = require('../../config.js'); 
const {
  createemojis,
  loginemojis,
  getemojisById,
  getemojis,
  updateemojis,
  deleteemojis
} = require("./emojis.service");

const { sign } = require("jsonwebtoken");
module.exports = {
  loginemojis: (req, res) => {
    const body = req.body;
    loginemojis(body.id, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          data: "Invalid userid/email or password"
        });
      }
      // console.log(results);
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
  createemojis: (req, res) => {
    const body = req.body;
    createemojis(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      return res.status(200).json({
        success: 1,
        message: "successfully created"
      });
    });
  },
  getemojisById: (req, res) => {
    const id = req.params.id;
    getemojisById(id, (err, results) => {
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
  getemojis: (req, res) => {
    const data=req.body;
    getemojis(data,(err, results) => {
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
  updateemojis: (req, res) => {
    const id = req.params.id;
    // console.log(id);
    const body = req.body;
    
    updateemojis(body,id, (err, results) => {
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
  deleteemojis: (req, res) => {
    const data = req.body;
    deleteemojis(data, (err, results) => {
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
