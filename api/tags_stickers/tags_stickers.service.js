const pool = require("../../config/database");
module.exports = {
  createtags_stickers: (data, callBack) => {
    pool.query(
      `insert into tags_stickers(tag_id, sticker_id, isPack) 
      values(?,?,?)`,
      [
        data.tag_id,
        data.sticker_id,
        data.isPack,
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
      );
    },
    gettags_stickers: callBack => {
      pool.query(
        `select id,tags_id, sticker_id, isPack from tags_stickers`,
        [],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results);
        }
        );
      },
      logintags_stickers: (id, callBack) => {
        pool.query(
          `select id,tags_id, sticker_id, isPack from tags_stickers where id = ?`,
          [id],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
          );
        },
        
        updatetags_stickers: (data,id, callBack) => {
          pool.query(
            `update tags_stickers set tags_id=?, sticker_id=? isPack=? where id = ?`,
            [
              data.tags_id,
              data.sticker_id,
              data.isPack,
              id
            ],
            (error, results, fields) => {
              if (error) {
                callBack(error);
              }
              return callBack(null, results[0]);
            }
            );
          },
          deletetags_stickers: (data, callBack) => {
            pool.query(
              `delete from tags_stickers where id = ?`,
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
          