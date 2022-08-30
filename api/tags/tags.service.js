const pool = require("../../config/database");
module.exports = {
  createTags: (data, callBack) => {
    pool.query(
      `insert into tags(name) 
      values(?)`,
      [
        data.name
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
      );
    },
    getTags: callBack => {
      pool.query(
        `select id,name,count from tags`,
        [],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results);
        }
        );
      },
      loginTags: (id, callBack) => {
        pool.query(
          `select id,name,count from tags where id = ?`,
          [id],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
          );
        },
        updateTags: (data,id, callBack) => {
          // var queryParams = [inventory_date,product_id,system_inventory,stock_sold,updated_by,inventory_date,product_id]
          // var owner=req.params.id;
          pool.query(
            `update tags set name=?, count=? where id = ?`,
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
          deleteTags: (data, callBack) => {
            pool.query(
              `delete from tags where id = ?`,
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
          