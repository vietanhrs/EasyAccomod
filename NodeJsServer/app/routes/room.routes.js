const multer = require('multer')
const path = require('path')
const authJwt = require('../middleware/authJwt')

const isPositiveInteger = (value) => Number.isInteger(Number(value)) && Number(value) > 0

module.exports = app => {
    const room = require('../controllers/room.controller')

    const router = require('express').Router()

    // Update room info by room ID
    router.put('/:id', authJwt.verifyToken, room.updateRoomInfo)

    router.get('/', room.findByQuery)

    router.get('/:id/image/:name', room.getImageByName)

    router.get('/images/:id', room.getRoomImagesByID)

    // Save new image to room image folder
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            const roomId = req.params.id

            if (!isPositiveInteger(roomId)) {
                return cb(new Error('Invalid room ID'))
            }

            // Resolve path and ensure it stays within roomImages directory
            const baseDir = path.resolve(__dirname, './../../roomImages')
            const savePath = path.resolve(baseDir, String(parseInt(roomId, 10)))

            if (!savePath.startsWith(baseDir)) {
                return cb(new Error('Invalid room ID: path traversal detected'))
            }

            cb(null, savePath)
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        }
    })

    upload = multer({ storage, preservePath: true })

    router.post('/:id/image', authJwt.verifyToken, upload.array(), room.addRoomImage)

    // Delete specific room's image
    router.delete('/:id/image/:fileName', authJwt.verifyToken, room.deleteRoomImageByFileName)

    // Delete a room
    router.delete('/:id', authJwt.verifyToken, room.deleteByID)

    app.use('/api/rooms', router)
}
