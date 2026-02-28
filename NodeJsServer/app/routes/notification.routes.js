module.exports = app => {
    const notifications = require("../controllers/notification.controller");
    const authJwt = require("../middleware/authJwt");

    var router = require("express").Router();

    router.get('/:username', notifications.getUserNotification)

    router.post('/', authJwt.verifyToken, notifications.createNotification)

    app.use('/api/notifications', router);
};
