const multer = require('multer')
const db = require('../models')
const path = require('path')
const fs = require('fs')
const authJwt = require('../middleware/authJwt')
const { sequelize } = require('../models')

const isPositiveInteger = (value) => Number.isInteger(Number(value)) && Number(value) > 0

module.exports = app => {
    const post = require("../controllers/post.controller.js");

    const room = db.rooms

    var router = require("express").Router();

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            let roomId = req.roomID || req.body.roomID

            if (!isPositiveInteger(roomId)) {
                return cb(new Error('Invalid room ID'))
            }

            // Resolve path and ensure it stays within roomImages directory
            const baseDir = path.resolve(__dirname, './../../roomImages')
            const savePath = path.resolve(baseDir, String(parseInt(roomId, 10)))

            if (!savePath.startsWith(baseDir)) {
                return cb(new Error('Invalid room ID: path traversal detected'))
            }

            if (!fs.existsSync(savePath)) {
                fs.mkdirSync(savePath, { recursive: true })
            }

            cb(null, savePath)
        },
        filename: function (req, file, cb) {
            // Add date to make sure that new file's name isn't duplicated
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)) // path.extname: add right file extension
        }
    })

    // Lấy id của phòng trọ tiếp theo sẽ được insert vào database
    let getNextRoomID = async (req, res, next) => {
        roomID = await room.max('roomID')

        if (!roomID) { // If room table is empty
            await sequelize.query('ALTER TABLE rooms AUTO_INCREMENT = 1')
            roomID = 1
        } else {
            // To make sure that new roomID in database equal new id in roomImages folder
            await sequelize.query(`ALTER TABLE rooms AUTO_INCREMENT = ${roomID}`)
            roomID += 1
        }

        req.roomID = roomID

        next()
    }

    upload = multer({ storage, preservePath: true })

    // Create new post with corresponding roomID
    router.post("/", authJwt.verifyToken, getNextRoomID, upload.any(), post.create)

    // Update post and room info by submitting form
    router.put("/form", authJwt.verifyToken, upload.any(), post.updatePostByForm)

    // Get preview posts by requirement for homepage
    router.get("/preview", post.getPreviewPosts)

    // Get post upload fee
    router.get("/uploadFee", post.getUploadFee)

    // Get post info by ID
    router.get("/:id", post.getPostInfoByID)

    // Get post with conditions specified in URL query string
    // find all if the req.query obj is empty
    router.get("/", post.findByQuery)

    // Update post info with given postID
    router.put("/:id", post.updatePostByID)

    // Delete posts with columns satisfy conditions in query string
    router.delete("/", post.deleteByQuery)

    app.use("/api/posts", router)
}
