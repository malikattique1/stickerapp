const pool = require("../../config/database");
module.exports = {
  createtrending_searches: (data, callBack) => {
    pool.query(
      `insert into trending_searches(name, count) 
      values(?,?)`,
      [
        data.name,
        data.count,
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
      );
    },
    gettrending_searches: callBack => {
      pool.query(
        `select id,name,count from trending_searches`,
        [],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results);
        }
        );
      },
      logintrending_searches: (id, callBack) => {
        pool.query(
          `select id,name,count from trending_searches where id = ?`,
          [id],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
          );
        },
        
        updatetrending_searches: (data,id, callBack) => {
          pool.query(
            `update trending_searches set name=?, count=? where id = ?`,
            [
              data.name,
              data.count,
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
          deletetrending_searches: (data, callBack) => {
            pool.query(
              `delete from trending_searches where id = ?`,
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
          