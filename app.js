require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');

const app = express();


const userRouter = require("./api/sticker/sticker.router");
const userRouter2 = require("./api/stickerpack/stickerpack.router");
const userRouter3 = require("./api/tags/tags.router");
const userRouter4 = require("./api/trendingsearches/trendingsearches.router");
const userRouter5 = require("./api/tags_stickers/tags_stickers.router");
const userRouter6 = require("./api/privacy/privacy.router");
const userRouter7 = require("./api/category/category.router");
const userRouter8 = require("./api/user/user.router");
const userRouter9 = require("./api/pack_category/pack_category.router");
const userRouter10 = require("./api/user_followers/user_followers.router");
const userRouter11 = require("./api/user_stickpack/user_stickpack.router");
const userRouter12 = require("./api/emojis/emojis.router");

const userRouter13 = require("./api/web_search/searchGoogle.router");


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); 

// pic_url: `http://localhost:4000/profile/${req.file.filename}`
app.use('/profile', express.static('upload/user/images'));
app.use('/tray_icon', express.static('upload/stickerpack/trayicon'));
app.use('/poster_icon', express.static('upload/stickerpack/postericon'));

app.use("/api/sticker", userRouter);
app.use("/api/stickerpack", userRouter2);
app.use("/api/tags", userRouter3);
app.use("/api/trendingsearches", userRouter4);
app.use("/api/tags_stickers", userRouter5);
app.use("/api/privacy", userRouter6);
app.use("/api/category", userRouter7);
app.use("/api/user", userRouter8);
app.use("/api/pack_category", userRouter9);
app.use("/api/user_followers", userRouter10);
app.use("/api/user_stickpack", userRouter11);
app.use("/api/emojis", userRouter12);

// google search
app.use("/api/", userRouter13);





const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("server up and running on PORT :", port);
});
