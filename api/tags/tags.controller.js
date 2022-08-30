
var config = require('../../config.js'); 

const {
  createTags,
  loginTags,
  getTagsById,
  getTags,
  updateTags,
  deleteTags
} = require("./tags.service");

const { sign } = require("jsonwebtoken");
module.exports = {
  loginTags: (req, res) => {
    const body = req.body;
    loginTags(body.id, (err, results) => {
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
      // const result = compareSync(body.password, results.password);
      // const result = bcrypt.compare(body.password, results.password);
      // console.log(body.password);
      // console.log(results.password);
      // console.log(result);
      
      if ((body.owner === results.owner)) {
      // if (result) {
        // results.password = undefined;
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
  createTags: (req, res) => {
    const body = req.body;
    // const salt = genSaltSync(10);
    // body.user_id = hashSync(body.user_id, salt);
    createTags(body, (err, results) => {
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
        // data: results
      });
    });
  },
  getTagsById: (req, res) => {
    const id = req.params.id;
    getTagsById(id, (err, results) => {
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
      // results.password = undefined;
      return res.json({
        success: 1,
        data: results
      });
    });
  },
  getTags: (req, res) => {
    getTags((err, results) => {
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
  updateTags: (req, res) => {
    const id = req.params.id;
console.log(id);
    const body = req.body;
    // const salt = genSaltSync(10);
    // body.password = hashSync(body.password, salt);
    updateTags(body,id, (err, results) => {
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
  deleteTags: (req, res) => {
    const data = req.body;
    deleteTags(data, (err, results) => {
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
