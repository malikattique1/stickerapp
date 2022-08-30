
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");


const searchGoogle = require('./searchGoogle.controller.js');

router.get('/search',checkToken, (request, response) => {
    const searchQuery = request.query.searchquery;
    if (searchQuery != null) {
        searchGoogle(searchQuery)
            .then(results => {
                response.status(200);
                response.json(results);
            });
    } else {
        response.end();
    }
  });

module.exports = router;
