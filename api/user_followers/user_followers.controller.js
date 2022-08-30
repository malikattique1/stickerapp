
var config = require('../../config.js'); 
const {
  createuser_followers,
  loginuser_followers,
  getuser_followersById,
  getuser_followers,
  updateuser_followers,
  deleteuser_followers,
  suggestedfollowers
} = require("./user_followers.service");

const { sign } = require("jsonwebtoken");
module.exports = {
  loginuser_followers: (req, res) => {
    const body = req.body;
    loginuser_followers(body.id, (err, results) => {
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
  createuser_followers: (req, res) => {
    const body = req.body;
    createuser_followers(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      return res.status(200).json({
        success: 1,
        message: "followed successfully"
      });
    });
  },

  getuser_followersById: (req, res) => {
    const id = req.params.id;
    getuser_followersById(id, (err, results) => {
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
  suggestedfollowers: (req, res) => {
    const id = req.params.id;
    suggestedfollowers(id, (err, results) => {
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
  getuser_followers: (req, res) => {
    getuser_followers((err, results) => {
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
  updateuser_followers: (req, res) => {
    const id = req.params.id;
console.log(id);
    const body = req.body;
    updateuser_followers(body,id, (err, results) => {
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
  deleteuser_followers: (req, res) => {
    const data = req.body;
    deleteuser_followers(data, (err, results) => {
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
        message: "unfollowed successfully"
      });
    });
  }
};
