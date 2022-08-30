
var config = require('../../config.js'); // get our config file

const {
  createtrending_searches,
  logintrending_searches,
  gettrending_searchesById,
  gettrending_searches,
  updatetrending_searches,
  deletetrending_searches
} = require("./trendingsearches.service");

const { sign } = require("jsonwebtoken");
module.exports = {
  logintrending_searches: (req, res) => {
    const body = req.body;
    logintrending_searches(body.id, (err, results) => {
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
  createtrending_searches: (req, res) => {
    const body = req.body;
    createtrending_searches(body, (err, results) => {
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
  gettrending_searchesById: (req, res) => {
    const id = req.params.id;
    gettrending_searchesById(id, (err, results) => {
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
  gettrending_searches: (req, res) => {
    gettrending_searches((err, results) => {
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
  updatetrending_searches: (req, res) => {
    const id = req.params.id;
    const body = req.body;
    updatetrending_searches(body,id, (err, results) => {
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
  deletetrending_searches: (req, res) => {
    const data = req.body;
    deletetrending_searches(data, (err, results) => {
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
