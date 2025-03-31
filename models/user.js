const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        default: null
    },
    height: {
        type: Number,
        default: null
    },
    weight: {
        type: Number,
        default: null
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', null],
        default: null
    },
    eatingPreference: {
        type: String,
        enum: ['Vegetarian', 'Non-vegetarian', 'Vegan', null],
        default: null
    },
    activityLevel: {
        type: String,
        enum: ['>=6 days', '3-6 days', '0-3 days', '0'],
        default: '0'
    },
    lactoseIntolerance: {
        type: String,
        enum: ['Yes', 'No'],
        default: 'No'
    },
    glutenIntolerance: {
        type: String,
        enum: ['Yes', 'No'],
        default: 'No'
    },
    bloodSugar: {
        type: Map,
        of: Number,
        default: {
            Monday: 0,
            Tuesday: 0,
            Wednesday: 0,
            Thursday: 0,
            Friday: 0,
            Saturday: 0,
            Sunday: 0
        }
    }
})

const User = mongoose.model("users", userSchema)

module.exports = User