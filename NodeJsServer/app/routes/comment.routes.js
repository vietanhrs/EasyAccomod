const validate = require('../middleware/validate');
const commentValidators = require('../middleware/validators/comment.validators');

module.exports = app => {
    const comments = require("../controllers/comment.controller");
    const authJwt = require("../middleware/authJwt");

    var router = require("express").Router();

    router.get('/', comments.getComments)

    router.post('/', authJwt.verifyToken, commentValidators.createRules, validate, comments.addComment)

    router.put('/:id', authJwt.verifyToken, commentValidators.updateRules, validate, comments.updateComment)

    router.delete('/:id', authJwt.verifyToken, comments.deleteComment)

    app.use('/api/comments', router);
};
