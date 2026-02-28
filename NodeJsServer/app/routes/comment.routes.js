module.exports = app => {
    const comments = require("../controllers/comment.controller");
    const authJwt = require("../middleware/authJwt");

    var router = require("express").Router();

    router.get('/', comments.getComments)

    router.post('/', authJwt.verifyToken, comments.addComment)

    router.put('/:id', authJwt.verifyToken, comments.updateComment)

    router.delete('/:id', authJwt.verifyToken, comments.deleteComment)

    app.use('/api/comments', router);
};
