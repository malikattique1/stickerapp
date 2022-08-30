var config = require('../config.js'); 
const jwt = require("jsonwebtoken");
module.exports = {
  checkToken: (req, res, next) => {
  var token = req.headers['x-access-token'];
  if (!token) 
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  jwt.verify(token, config.secret, function(err, decoded) {      
    if (err) 
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });    
    req.user_id = decoded.user_id;
    req.decoded = decoded;
    next();
  });
  }
};
