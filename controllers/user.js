const User = require("../models/user")
const { setUser } = require("../service/auth")

const { geminiText, geminiPretrainedPrompts } = require("../gemini-api.js")
const { geminiImage } = require("../ggimagemodeljsfinal.js")

async function handlerRenderResponse(req, res) {

    if(req.body.promptButton) {
        const user = await User.findOne({
            _id: req.user._id
        })

        const responseMsg = await geminiPretrainedPrompts(req.body.promptButton, user)
        return res.render("home", { msg: JSON.parse(responseMsg) })
    } else if(req.body.promptText) {
        try {
            const { promptText } = req.body;
            const responseMsg = await geminiText(promptText)
            return res.render("home", { msg: JSON.parse(responseMsg) })
            
        } catch (error) {
            console.error('Error generating content:', error);
        }
    } else {
        console.log("hello")
        res.json({ msg: "SUCCESS" })
    }
  }

async function handlerResponseImage(req, res) {
    const responseMsg = await geminiImage()
    return res.render("home", { msg: JSON.parse(responseMsg) })
}

async function handlerSignupUser(req, res) {
    const { name, email, password } = req.body
    const user = await User.create({
        name: name,
        email: email,
        password: password
    })

    const token = setUser(user)
    res.cookie("uid", token)
    return res.redirect("/")
}

async function handlerLoginUser(req, res) {
    const { email, password } = req.body
    const user = await User.findOne({
        email: email,
        password: password
    })
    if(!user) {
        return res.render("login", {
            error: "invalid username or password"
        })
    } 

    const token = setUser(user)
    res.cookie("uid", token)
    return res.redirect("/")
}

async function handlerDisplayHomepage(req, res) {
    
    const user = await User.findOne({
        _id: req.user._id
    })

    if(!user) {
        return res.render("login", {
            error: "invalid username or password"
        })
    } 
    return res.render("home", { user })
}

async function handlerStoreUserDetails (req, res) {

    let update = {
        age: req.body.age,
        height: req.body.height,
        weight: req.body.weight,
        gender: req.body.gender,
        eatingPreference: req.body.diet_preference,
        lactoseIntolerance: req.body.lactose,
        glutenIntolerance: req.body.gluten,
        activityLevel: req.body.activity
    }

    if(req.body.fullname)   
        update.name = req.body.fullname
    if(req.body.email)
        update.email = req.body.email

    await User.findOneAndUpdate(
        { _id: req.user._id }, 
        update, 
        { new: true } 
    )

    return res.redirect("/")
}

async function handlerGetUserData(req, res) {
    const user = await User.findOne({
        _id: req.user._id
    })

    if(!user) {
        return res.render("login", {
            error: "invalid username or password"
        })
    } 

    res.json(user)
}

async function handlerStoreSugar(req, res) {
    const { fastingSugar } = req.body;

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    const currentDate = new Date()
    const day = currentDate.getDay()

    if(day == 0) {
        const newBloodSugarLevel = {
            Sunday: fastingSugar,
            Monday: 0,
            Tuesday: 0,
            Wednesday: 0,
            Thursday: 0,
            Friday: 0,
            Saturday: 0
        }

        await User.findOneAndUpdate(
            { _id: req.user._id }, // Filter to find the user by their _id
            { $set: { bloodSugar: newBloodSugarLevel } }, // Set the new blood sugar level
            { new: true } // Return the updated document
        )
    } else {
        await User.findOneAndUpdate(
            { _id: req.user._id }, // Filter to find the user by their _id
            { $set: { [`bloodSugar.${days[day]}`]: fastingSugar } }, // Set the blood sugar level for the current day
            { new: true } // Return the updated document
        )
    }
    
    return res.redirect("/")
}

module.exports = {
    handlerSignupUser,
    handlerLoginUser,
    handlerDisplayHomepage,
    handlerRenderResponse,
    handlerResponseImage,
    handlerGetUserData,
    handlerStoreSugar,
    handlerStoreUserDetails
}