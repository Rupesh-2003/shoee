const mongoose = require('mongoose')

const Schema = mongoose.Schema

const verification = new Schema({
    mobile : {type: Number, required: true},
    otp : {type: String, required: true},
    user : {type: Object, required: true}
})

module.exports = mongoose.model('Verificaton', verification)