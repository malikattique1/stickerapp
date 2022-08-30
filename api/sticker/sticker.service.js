const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    if (!data.sticker_path.toLowerCase().match(/\.(webp)/g)) {
      throw new Error("Only supports webp format");
  }
    pool.query(
      `insert into sticker(name, stickerpacks_id, user_id, privacy, sticker_path, country, is_paid, tags_sticker) 
                values(?,?,?,?,?,?,?,?)`,
      [
        data.name,
        data.stickerpacks_id,
        data.user_id,
        data.privacy,
        data.sticker_path,
        data.country,
        data.is_paid,
        data.tags_sticker
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getStickerByuser_id: (user_id, callBack) => {

    pool.query(
      `select * from sticker where user_id = ?`,
      [user_id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  getStickerByUserId: (id, callBack) => {
    pool.query(
      `select id,name, stickerpacks_id, user_id, rating, downloads, download_size, privacy, sticker_path, country, pack_order, is_paid, tags_sticker from sticker where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  getStickers: callBack => {
    pool.query(
      `select name,rating,downloads,country from sticker ORDER BY downloads DESC LIMIT 20`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  updateSticker: (data, callBack) => {
    pool.query(
      `update sticker set name=?, stickerpacks_id=?, user_id=?, privacy=?, sticker_path=?, country=?, is_paid=?, tags_sticker=? where id = ?`,
      [
        data.name,
        data.stickerpacks_id,
        data.user_id,
        data.privacy,
        data.sticker_path,
        data.country,
        data.is_paid,
        data.tags_sticker,
        data.id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  updateStickerorderinpack: (id,data, callBack) => {
    pool.query(
      'begin;set @from = ' + id + ';set @to = ' + data.id + ';set @tmpid = (2000000 + @from % 147483647);update sticker set id=@tmpid where id = @from;update sticker set id=@from where id=@to;update sticker set id=@to where id = @tmpid;commit;',
      [
        data.id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  deleteSticker: (data, callBack) => {
    pool.query(
      `delete from sticker where id = ?`,
      [data.id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getStickerByStickername: (name, callBack) => {
    pool.query(
      'SELECT searched FROM sticker WHERE name LIKE "%' + name + '%"',
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        counter=results[0].searched;
        console.log(counter);
        count=counter;
        pool.query(
          'update sticker set searched=? WHERE name LIKE "%' + name + '%" ',
          [++count],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }

          }
        );
      }
    );
    pool.query(
      'SELECT * FROM sticker WHERE name LIKE "%' + name + '%"; SELECT * FROM sticker WHERE stickerpacks_id IN( SELECT stickerpacks_id FROM sticker WHERE name LIKE "%' + name + '%"); SELECT * FROM stickerpack WHERE name LIKE "%' + name + '%" ; SELECT * FROM stickerpack WHERE pack_category IN( SELECT pack_category FROM stickerpack WHERE name LIKE "%' + name + '%"); SELECT * FROM user WHERE username LIKE "%' + name + '%" ; SELECT * FROM user WHERE is_premium IN( SELECT is_premium FROM user WHERE username LIKE "%' + name + '%")',
      [name,name,name,name,name,name],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        // console.log(fields);
        return callBack(null, results);
      }
    );
  },
  suggestedstickers: (callBack) => {
    pool.query(
      ' SELECT * FROM sticker ORDER BY searched DESC LIMIT 20',
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        // console.log(fields);
        return callBack(null, results);
      }
    );
  },
  topfree: (callBack) => {
    pool.query(
      ' SELECT * FROM sticker WHERE is_paid = 0 ORDER BY downloads DESC LIMIT 20',
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        // console.log(fields);
        return callBack(null, results);
      }
    );
  },
  toppaid: (callBack) => {
    pool.query(
      ' SELECT * FROM sticker WHERE is_paid = 1 ORDER BY downloads DESC LIMIT 20',
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  popularstickers: (callBack) => {
    pool.query(
      ' SELECT * FROM sticker ORDER BY rating DESC LIMIT 20',
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        // console.log(fields);
        return callBack(null, results);
      }
    );
  },
  addedtowhatsapp: (data, callBack) => {
    pool.query(
      'SELECT added FROM sticker WHERE id=?',
      [data.id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        counter=results[0].added;
        console.log(counter);
        count=counter
        pool.query(
          'update sticker set added=? where id = ?',
          [
            ++count,
            data.id
          ],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results);

          }
        );
      }
    );
  },
  interestedstickers: (callBack) => {
    pool.query(
      ' SELECT * FROM sticker ORDER BY added DESC LIMIT 20',
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        // console.log(fields);
        return callBack(null, results);
      }
    );
  },
};
