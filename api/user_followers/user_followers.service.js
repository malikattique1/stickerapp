const pool = require("../../config/database");
module.exports = {
  createuser_followers: (data, callBack) => {
    pool.query(
      `insert into user_followers(user_id, follower_id) 
      values(?,?)`,
      [
        data.user_id,
        data.follower_id,
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
      );
    },
    getuser_followers: callBack => {
      pool.query(
        `select id, user_id, follower_id from user_followers`,
        [],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results);
        }
        );
      },
      getuser_followersById: (id,callBack) => {
        pool.query(
          `select id,profile_pic,full_name from user where id IN(select follower_id from user_followers where user_id=?)`,
          [id],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results);
          }
          );
        },
        suggestedfollowers: (id,callBack) => {
          pool.query(
            `select id,profile_pic,full_name from user where id IN(select user_id from user_followers where follower_id=?)`,
            [id],
            (error, results, fields) => {
              if (error) {
                callBack(error);
              }
              return callBack(null, results);
            }
            );
          },
          loginuser_followers: (id, callBack) => {
            pool.query(
              `select id, user_id, follower_id from user_followers where id = ?`,
              [id],
              (error, results, fields) => {
                if (error) {
                  callBack(error);
                }
                return callBack(null, results[0]);
              }
              );
            },
            
            updateuser_followers: (data,id, callBack) => {
              pool.query(
                `updateuser_followers set user_id=?, follower_id=? where id = ?`,
                [
                  data.user_id,
                  data.follower_id,
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
              deleteuser_followers: (data, callBack) => {
                pool.query(
                  `delete from user_followers where follower_id =? AND user_id=?`,
                  [data.follower_id,
                    data.user_id],
                    (error, results, fields) => {
                      if (error) {
                        callBack(error);
                      }
                      return callBack(null, results[0]);
                    }
                    );
                  }
                };
                