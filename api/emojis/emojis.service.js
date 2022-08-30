const pool = require("../../config/database");
module.exports = {
  createemojis: (data, callBack) => {
    pool.query(
      `insert into emojis(path,is_emoji) 
      values(?,?)`,
      [
        data.path,
        data.is_emoji
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
      );
    },
    getemojis: (data,callBack) => {
      pool.query(
        `select id,path from emojis where is_emoji=?`,
        [data.is_emoji],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results);
        }
        );
      },
      loginemojis: (id, callBack) => {
        pool.query(
          `select id,path from emojis where id = ?`,
          [id],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
          );
        },
        updateemojis: (data,id, callBack) => {
          pool.query(
            `update emojis set path=? where id = ?`,
            [
              data.path,
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
          deleteemojis: (data, callBack) => {
            pool.query(
              `delete from emojis where id = ?`,
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
          