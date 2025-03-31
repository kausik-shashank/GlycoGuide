const { getUser } = require("../service/auth")

async function restrictToLoggedInUser(req, res, next) {
    const userID = req.cookies?.uid
    if(!userID) {
        return res.render("login")
    }

    const user = getUser(userID)

    if(!user) 
        return res.render("login")

    req.user = user
    next()
}

async function checkAuth(req, res, next) {
    const userID = req.cookies?.uid

    const user = getUser(userID)

    req.user = user
    next()
}

module.exports = {
    restrictToLoggedInUser,
    checkAuth
}