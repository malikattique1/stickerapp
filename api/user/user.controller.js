var bcrypt = require('bcrypt');
var config = require('../../config.js'); 
// const pool = require("../../config/database");

const {
  createuser,
  loginuserbyemail,
  getuserById,
  getuser,
  updateuser,
  deleteuser,
  editprofile,
} = require("./user.service");
const { hashSync, genSaltSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");


const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: './upload/user/images',
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}_${file.originalname}`)
    // return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})


module.exports = {
  
  
  login: (req, res) => {
    const body = req.body;
    loginuserbyemail(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          data: "Invalid email or password"
        });
      }
      const result = bcrypt.compareSync(body.password, results.password);
      // console.log(result);
      if (result) {
        results.password = undefined;
        const jsontoken = sign({ result: results }, config.secret, {
          expiresIn: "100h"
        });
        return res.json({
          success: 1,
          message: "login successfully",
          token: jsontoken
        });
      } else {
        return res.json({
          success: 0,
          data: "Invalid email or password"
        });
      }
    });
  },
  createuser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    createuser(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: err.code,
          message: err.sqlMessage
        });
      }
      return res.status(200).json({
        success: 1,
        message: results,
      });
    });
  },
  getuserById: (req, res) => {
    const id = req.params.id;
    getuserById(id, (err, results) => {
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
  getuser: (req, res) => {
    getuser((err, results) => {
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
  updateuser: (req, res) => {
    const body = req.body;
    updateuser(body, (err, results) => {
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
  
  uploadFile:function(req,res,next){
    const upload = multer({
      storage: storage,
      limits: {
        fileSize: 10000000
      }
    }).single('profile');
    
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        res.send(err);
      } else if (err) {
        res.send(err);
      }else{
        next();
      }
    })
  },
  editprofile: (req, res) => {
    //  console.log(`http://localhost:4000/profile/${req.file.filename}`)
    const body = req.body;
    const file = req.file;
    
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    // console.log(body.username);
    // console.log("filename",`${file.filename}`)
    editprofile(file,body, (err, results) => {
      // console.log("res",results)
      if (err) {
        console.log(err);
        return;
      }
      res.json({
        success: 1,
        message: "Updated successfully",
        pic_url: `http://localhost:5000/profile/${req.file.filename}`
      });
    });
  },
  
  
  
  deleteuser: (req, res) => {
    const data = req.body;
    deleteuser(data, (err, results) => {
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
