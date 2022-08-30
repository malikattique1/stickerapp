const pool = require("../../config/database");
module.exports = {
  createprivacy: (data, callBack) => {
    pool.query(
      `insert into privacy(type, followers) 
      values(?,?)`,
      [
        data.type,
        data.followers,
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
      );
    },
    getprivacy: callBack => {
      pool.query(
        `select id,type,followers from privacy`,
        [],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results);
        }
        );
      },
      loginprivacy: (id, callBack) => {
        pool.query(
          `select id,type, followers from privacy where id = ?`,
          [id],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
          );
        },
        
        updateprivacy: (data,id, callBack) => {
          pool.query(
            `update privacy set type=?, followers=? where id = ?`,
            [
              data.type,
              data.private,
              data.public,
              data.followers,
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
          deleteprivacy: (data, callBack) => {
            pool.query(
              `delete from privacy where id = ?`,
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
          