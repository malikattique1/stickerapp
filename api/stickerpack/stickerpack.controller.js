
var config = require('../../config.js'); // get our config file

const {
  createStickerpack,
  loginstickerpack,
  getStickerpackByCategory,
  getStickerpackByid,
  getStickerspack,
  updateStickerpack,
  deleteStickerpack
} = require("./stickerpack.service");

const { sign } = require("jsonwebtoken");


const multer = require("multer");
// const path = require("path");
const storage = multer.diskStorage({
  destination:(req, file, cb) => {
    // console.log(file)
    if (file.fieldname === "tray_icon") {
      cb(null, './upload/stickerpack/trayicon');
    }
    else if (file.fieldname === "poster_icon") {
      cb(null, './upload/stickerpack/postericon')
    }
  },
  // destination: './uploads',
  filename: (req,file,cb)=>{
    if (file.fieldname === "tray_icon") {
      return cb(null, `${file.fieldname}_${Date.now()}_${file.originalname}`)
    }
    else if (file.fieldname === "poster_icon") {
      return cb(null, `${file.fieldname}_${Date.now()}_${file.originalname}`)
    }
  }
});
const file_filter = (req, file, cb) => {
  if (file.mimetype =="image/png" || file.mimetype == "image/jpeg" || file.mimetype == "image/jpg"|| file.mimetype == "image/webp") {
    cb(null, true) } else { cb(null, false)}
  }
  


  
  module.exports = {
    loginstickerpack: (req, res) => {
      const body = req.body;
      loginstickerpack(body.owner, (err, results) => {
        if (err) {
          console.log(err);
        }
        if (!results) {
          return res.json({
            success: 0,
            data: "Invalid userid/email or password"
          });
        }
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



    uploadFile:function(req,res,next){
      const upload = multer({
        storage: storage,
        fileFilter: file_filter,
        limits: {
          fileSize: '10mb'
        }
      })
      .fields([{name:'tray_icon',maxCount:10},
      {name:'poster_icon',maxCount:10}]);
      
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
    createStickerpack: (req, res) => {
      const body = req.body;
      const file1 = req.files['tray_icon'][0]
      const file2 = req.files['poster_icon'][0]
      const file = req.files;
      // console.log("body",body);
      // console.log("country",body.country);
      // console.log("ff1",file1.filename);
      // console.log("ff2",file2.filename);
      if (!file1.filename.toLowerCase().match(/\.(jpg|png|gif)/g)) {
        return res.status(500).json({
          success: 0,
          message: "Only supports jpg file formats"
        });
      }
      createStickerpack(file,body, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        res.json({
          success: 1,
          message: "created successfully",
        });
      });
    },
    getStickerpackByCategory: (req, res) => {
      const category = req.params.category;
      getStickerpackByCategory(category, (err, results) => {
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
    getStickerpackByid: (req, res) => {
      const id = req.params.id;
      getStickerpackByid(id, (err, results) => {
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
    getStickerspack: (req, res) => {
      getStickerspack((err, results) => {
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


    updateStickerpack: (req, res) => {
      const body = req.body;
      const file1 = req.files['tray_icon'][0]
      const file2 = req.files['poster_icon'][0]
      const file = req.files;
    
      if (!file1.filename.toLowerCase().match(/\.(jpg|png|gif)/g)) {
        return res.status(500).json({
          success: 0,
          message: "Only supports jpg file formats"
        });
      }
      updateStickerpack(file,body, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        res.json({
          success: 1,
          message: "updated successfully",
        });
      });
    },
    deleteStickerpack: (req, res) => {
      const data = req.body;
      deleteStickerpack(data, (err, results) => {
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
  