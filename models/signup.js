const mongoose = require('mongoose')

const Schmea = mongoose.Schema

const signup = new Schmea({
    name : {type: String, required: true},
    mobile : {type: Number, required: true},
    password : {type: String, required: true},
    liked: [{type: Number, required: true}],
    cart: [{type: Object, required: true}]
})

module.exports = mongoose.model('User', signup)