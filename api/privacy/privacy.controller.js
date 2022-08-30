var config = require('../../config.js'); 
const {
  createprivacy,
  loginprivacy,
  getprivacyById,
  getprivacy,
  updateprivacy,
  deleteprivacy
} = require("./privacy.service");

const { sign } = require("jsonwebtoken");
module.exports = {
  loginprivacy: (req, res) => {
    const body = req.body;
    loginprivacy(body.id, (err, results) => {
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
  createprivacy: (req, res) => {
    const body = req.body;
    createprivacy(body, (err, results) => {
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

  getprivacyById: (req, res) => {
    const id = req.params.id;
    getprivacyById(id, (err, results) => {
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
  getprivacy: (req, res) => {
    getprivacy((err, results) => {
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
  updateprivacy: (req, res) => {
    const id = req.params.id;
console.log(id);
    const body = req.body;
    updateprivacy(body,id, (err, results) => {
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
  deleteprivacy: (req, res) => {
    const data = req.body;
    deleteprivacy(data, (err, results) => {
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
