const jwt = require("jsonwebtoken")
const authConfig = require('../config/auth.config')
const db = require('../models')
const Account = db.accounts

verifyToken = async (req, res, next) => {
    const token = req.cookies && req.cookies.token
    if (!token) {
        return res.status(401).send({ message: 'Access denied: no token provided' })
    }

    try {
        const decoded = jwt.verify(token, authConfig.secret)

        const account = await Account.findAll({
            where: { username: decoded.username }
        })

        if (!account || account.length === 0) {
            return res.status(401).send({ message: 'Access denied: account not found' })
        }

        req.username = decoded.username
        next()
    } catch (err) {
        return res.status(401).send({ message: 'Access denied: invalid token' })
    }
}

module.exports = {
    verifyToken
}
