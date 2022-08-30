const pool = require("../../config/database");
// const  search  = require("./user.router");

module.exports = {
  createuser: (data, callBack) => {
    pool.query("SELECT username FROM user WHERE username= ?", [data.username], function (err, rows,fields){
      if (err) throw err;
      if (rows.length) {
        console.log(rows[0].username+" already exists");
        //username starts with small letter auto in db 
        return callBack(null, rows[0].username+" already exists");
      }
      else{
        console.log('Success...');
        pool.query(
          `insert into user(full_name, email, password, username ) 
          values(?,?,?,?)`,
          [
            data.full_name,
            data.email,
            data.password,
            data.username,
          ],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, "Signup Successfully");
          }
          );

      }
    });
   
    },
    
    getuser: callBack => {
      pool.query(
        `select id, profile_pic,full_name, followers_count, followings_count, stickers_count, stickerpack_counts, email, password, username, is_premium from user`,
        [],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results);
        }
        );
      },
      getuserById: (id, callBack) => {
        pool.query(
          `select id, profile_pic,full_name, followers_count, followings_count, stickers_count, stickerpack_counts, email, username, is_premium from user where id = ?`,
          [id],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
          );
        },
        loginuserbyemail: (email, callBack) => {
          pool.query(
            `select profile_pic,full_name, followers_count, followings_count, stickers_count, stickerpack_counts, email, password, username, is_premium  from user where email = ?`,
            [
              email
            ],
            (error, results, fields) => {
              if (error) {
                callBack(error);
              }
              return callBack(null, results[0]);
            }
            );
          },
          updateuser: (data, callBack) => {
            pool.query(
              `update user set profile_pic=?,full_name=?, email=?, password=?, is_premium=? where username = ?`,
              [
                data.profile_pic,
                data.full_name,
                data.email,
                data.password,
                data.is_premium,
                data.username,
              ],
              (error, results, fields) => {
                if (error) {
                  callBack(error);
                }
                return callBack(null, results[0]);
              }
              );
            },
       
              editprofile: (file,body, callBack) => {
                // console.log(`http://localhost:4000/profile/${file.filename}`)
                pool.query(
                  `update user set profile_pic=?, full_name=?, email=?, password=? where username = ?`,
                  [
                    file.filename,
                    body.full_name,
                    body.email,
                    body.password,
                    body.username
                  ],
                  (error, results, fields) => {
                    if (error) {
                      callBack(error);
                    }
                    return callBack(null, results[0]);
                  }
                  );
                },
                deleteuser: (data, callBack) => {
                  pool.query(
                    `delete from user where username = ?`,
                    [data.username],
                    (error, results, fields) => {
                      if (error) {
                        callBack(error);
                      }
                      return callBack(null, results[0]);
                    }
                    );
                  }
                };
                