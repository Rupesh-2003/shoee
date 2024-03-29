const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const slashes = require('connect-slashes')

const AuthRoutes = require('./routes/authRoutes')

const app = express()

app.use(bodyParser.json())

//cors new way
app.use(cors())

//cors old way

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', 
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
//     next();
// })

app.use('/', AuthRoutes)

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'))
    app.use(slashes(false))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    })
}

mongoose
.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.zhgqg.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, 
{   
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
    
}).then(() => {
    console.log("Connection succesful")
    app.listen(process.env.PORT || 5000)
}).catch(err => {
    console.log(err)
})