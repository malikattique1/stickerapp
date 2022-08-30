const pool = require("../../config/database");
module.exports = {
  createpack_category: (data, callBack) => {
    pool.query(
      `insert into pack_category(category_id, pack_id) 
      values(?,?)`,
      [
        data.category_id,
        data.pack_id,
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
      );
    },
    getpack_category: callBack => {
      pool.query(
        `select id,category_id, pack_id from pack_category`,
        [],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results);
        }
        );
      },
      loginpack_category: (id, callBack) => {
        pool.query(
          `select id,category_id, pack_id from pack_category where id = ?`,
          [id],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
          );
        },
        
        updatepack_category: (data,id, callBack) => {
          pool.query(
            `update pack_category set category_id=?, pack_id=? where id = ?`,
            [
              data.category_id,
              data.pack_id,
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
          deletepack_category: (data, callBack) => {
            pool.query(
              `delete from pack_category where id = ?`,
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
          