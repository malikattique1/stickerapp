const pool = require("../../config/database");
module.exports = {
  createcategory: (data, callBack) => {
    pool.query(
      `insert into category(name) 
      values(?)`,
      [
        data.name,
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
      );
    },
    getcategory: callBack => {
      pool.query(
        `select DISTINCT name from category`,
        [],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results);
        }
        );
      },
      logincategory: (id, callBack) => {
        pool.query(
          `select id,name from category where id = ?`,
          [id],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
          );
        },
        updatecategory: (data,id, callBack) => {
          pool.query(
            `update category set name=? where id = ?`,
            [
              data.name,
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
          deletecategory: (data, callBack) => {
            pool.query(
              `delete from category where id = ?`,
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
          