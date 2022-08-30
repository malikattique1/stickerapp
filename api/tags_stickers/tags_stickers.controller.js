var config = require('../../config.js'); // get our config file

const {
  createtags_stickers,
  logintags_stickers,
  gettags_stickersById,
  gettags_stickers,
  updatetags_stickers,
  deletetags_stickers
} = require("./tags_stickers.service");

const { sign } = require("jsonwebtoken");
module.exports = {
  logintags_stickers: (req, res) => {
    const body = req.body;
    logintags_stickers(body.id, (err, results) => {
      
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
  createtags_stickers: (req, res) => {
    const body = req.body;
    createtags_stickers(body, (err, results) => {
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
  gettags_stickersById: (req, res) => {
    const id = req.params.id;
    gettags_stickersById(id, (err, results) => {
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
  gettags_stickers: (req, res) => {
    gettags_stickers((err, results) => {
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
  updatetags_stickers: (req, res) => {
    const id = req.params.id;
console.log(id);
    const body = req.body;
    updatetags_stickers(body,id, (err, results) => {
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
  deletetags_stickers: (req, res) => {
    const data = req.body;
    deletetags_stickers(data, (err, results) => {
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
