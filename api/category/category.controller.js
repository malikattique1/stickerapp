
var config = require('../../config.js'); 
const {
  createcategory,
  logincategory,
  getcategoryById,
  getcategory,
  updatecategory,
  deletecategory
} = require("./category.service");

const { sign } = require("jsonwebtoken");
module.exports = {
  logincategory: (req, res) => {
    const body = req.body;
    logincategory(body.id, (err, results) => {
      
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
  createcategory: (req, res) => {
    const body = req.body;
    createcategory(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      return res.status(200).json({
        success: 1,
        message: "category created"
      });
    });
  },
  getcategoryById: (req, res) => {
    const id = req.params.id;
    getcategoryById(id, (err, results) => {
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
  getcategory: (req, res) => {
    getcategory((err, results) => {
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
  updatecategory: (req, res) => {
    const id = req.params.id;
// console.log(id);
    const body = req.body;
    updatecategory(body,id, (err, results) => {
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
  deletecategory: (req, res) => {
    const data = req.body;
    deletecategory(data, (err, results) => {
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
