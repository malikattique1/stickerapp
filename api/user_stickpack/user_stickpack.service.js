const pool = require("../../config/database");
module.exports = {
  createuser_stickpack: (data, callBack) => {
    pool.query(
      `insert into user_stickpack(user_id, stickpack_id) 
      values(?,?)`,
      [
        data.user_id,
        data.stickpack_id,
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
      );
    },
    getuser_stickpack: callBack => {
      pool.query(
        `select id, user_id, stickpack_id from user_stickpack`,
        [],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results);
        }
        );
      },
      loginuser_stickpack: (id, callBack) => {
        pool.query(
          `select id, user_id, stickpack_id from user_stickpack where id = ?`,
          [id],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
          );
        },
        updateuser_stickpack: (data,id, callBack) => {
          pool.query(
            `update user_stickpack set user_id=?, stickpack_id=? where id = ?`,
            [
              data.user_id,
              data.stickpack_id,
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
          deleteuser_stickpack: (data, callBack) => {
            pool.query(
              `delete from user_stickpack where id = ?`,
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
          