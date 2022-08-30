const pool = require("../../config/database");

module.exports = {

  createStickerpack: (file,body, cb) => {
    // console.log("file",file)
    const file1 = file['tray_icon'][0] // single img
    // const file2 = file['poster_icon'][0]
    // console.log("file1",file1)
    // console.log("file1",file2)
    const file2 = file['poster_icon'] // multiple img
    // console.log("drd",file2);
    let postericon_array=[]
    file2.forEach(function (items) { 
      postericon_array.push(items.filename)
    });
    
    if (!file1.filename.toLowerCase().match(/\.(jpg)/g)) {
      throw new Error("Only supports jpg file format");
    }
    pool.query(
      `insert into stickerpack(name, owner, privacy, tray_icon, country, poster_icon, pack_category, is_paid) values(?,?,?,?,?,?,?,?)`,
      [
        body.name,
        body.owner,
        body.privacy,
        file1.filename,
        body.country,
        postericon_array.join(', '),
        // JSON.stringify(postericon_array),
        body.pack_category,
        body.is_paid,
      ],
      (error, results, fields) => {
        if (error) {
          cb(error);
        }
        return cb(null, results);
      }
      );
    },
    getStickerpackByCategory: (category, callBack) => {
      pool.query(
        `select * from stickerpack where pack_category IN (select pack_category from stickerpack where pack_category = ?)`,
        [category],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results);
        }
        );
      },
      getStickerpackByid: (id, callBack) => {
        pool.query(
          `select * from stickerpack where id =?`,
          [id],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results);
          }
          );
        },
        getStickerspack: callBack => {
          pool.query(
            `select id,name, rating, downloads, download_size, no_of_stickers, privacy, tray_icon, country, poster_icon, pack_category, is_paid from stickerpack`,
            [],
            (error, results, fields) => {
              if (error) {
                callBack(error);
              }
              return callBack(null, results);
            }
            );
          },
          loginstickerpack: (owner, callBack) => {
            pool.query(
              `select id,no_of_stickers, privacy, tray_icon, country, poster_icon, pack_category, is_paid from stickerpack where owner = ?`,
              [owner],
              (error, results, fields) => {
                if (error) {
                  callBack(error);
                }
                return callBack(null, results[0]);
              }
              );
            },
            
            
            updateStickerpack: (file,body, cb) => {
              const file1 = file['tray_icon'][0] // single img
              const file2 = file['poster_icon'] // multiple img
              let postericon_array=[]
              file2.forEach(function (items) { 
                postericon_array.push(items.filename)
              });
              if (!file1.filename.toLowerCase().match(/\.(jpg)/g)) {
                throw new Error("Only supports jpg file format");
              }
              pool.query(
                `update stickerpack set name=?, privacy=?, tray_icon=?, country=?, poster_icon=?, pack_category=? , is_paid=? where id = ?`,
                [
                  body.name,
                  body.privacy,
                  file1.filename,
                  body.country,
                  postericon_array.join(', '),
                  body.pack_category,
                  body.is_paid,
                  body.id
                ],
                (error, results, fields) => {
                  if (error) {
                    cb(error);
                  }
                  return cb(null, results);
                }
                );
              },
              
              deleteStickerpack: (data, callBack) => {
                pool.query(
                  `delete from stickerpack where id = ?`,
                  [data.id],
                  (error, results, fields) => {
                    if (error) {
                      callBack(error);
                    }
                    return callBack(null, results[0]);
                  }
                  );
                }
              };
              