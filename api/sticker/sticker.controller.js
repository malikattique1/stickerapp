
var config = require('../../config.js'); 

const {
  create,
  getStickerByuser_id,
  getStickerByUserId,
  getStickers,
  updateSticker,
  deleteSticker,
  getStickerByStickername,
  topfree,
  toppaid,
  popularstickers,
  suggestedstickers,
  addedtowhatsapp,
  interestedstickers,
  updateStickerorderinpack
  
} = require("./sticker.service");
const { sign } = require("jsonwebtoken");
module.exports = {
  login: (req, res) => {
    const body = req.body;
    getStickerByuser_id(body.user_id, (err, results) => {
      
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          data: "Invalid userid/email or password"
        });
      }
      if ((body.user_id === results.user_id)) {
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
  createSticker: (req, res) => {
    const body = req.body;
    create(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      return res.status(200).json({
        success: 1,
        message: "Sticker Created"
        // data: results
      });
    });
  },
  getStickerByUserId: (req, res) => {
    const id = req.params.id;
    getStickerByUserId(id, (err, results) => {
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
      results.password = undefined;
      return res.json({
        success: 1,
        data: results
      });
    });
  },
  getStickers: (req, res) => {
    getStickers((err, results) => {
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
  updateSticker: (req, res) => {
    const body = req.body;
    updateSticker(body, (err, results) => {
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
  updateStickerorderinpack: (req, res) => {
    const body = req.body;
    const id = req.params.id;

    updateStickerorderinpack(id,body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "Ordered successfully"
      });
    });
  },
  deleteSticker: (req, res) => {
    const data = req.body;
    deleteSticker(data, (err, results) => {
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
  },
  getStickerByStickername: (req, res) => {
    const name = req.params.name;
    getStickerByStickername(name, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (results[0].length === 0 && results[1].length === 0 && results[2].length === 0 && results[3].length === 0 && results[4].length === 0) {
        return res.json({
          success: 0,
          message: "Record not Found"
        });
      }
      results.password = undefined;
      return res.json({
        success: 1,
        data: results
      });
    });
  },
  topfree: (req, res) => {
    topfree((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (results.length === 0) {
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
  toppaid: (req, res) => {
    toppaid((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (results.length === 0) {
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
  popularstickers: (req, res) => {
    popularstickers((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (results.length === 0) {
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
  suggestedstickers: (req, res) => {
    suggestedstickers((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (results.length === 0) {
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
  addedtowhatsapp: (req, res) => {
    const body = req.body;
    addedtowhatsapp(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "Added successfully"
      });
    });
  },
  interestedstickers: (req, res) => {
    interestedstickers((err, results) => {
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
};
