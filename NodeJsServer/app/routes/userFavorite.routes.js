module.exports = app => {
    const userFavorites = require("../controllers/userFavorite.controller");
    const authJwt = require("../middleware/authJwt");

    var router = require("express").Router();

    router.get('/user/:username', userFavorites.getAllUserFavorite)

    router.get('/post/:postID', userFavorites.getAllPostFavorite)

    router.get('/like/:username/:id', userFavorites.checkUserFavorite)

    router.post('/', authJwt.verifyToken, userFavorites.createFavorite)

    router.delete('/:username/:id', authJwt.verifyToken, userFavorites.deleteFavorite)

    app.use('/api/userfavorites', router);
};
