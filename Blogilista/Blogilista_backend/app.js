const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const getTokenFrom = require('./utils/middleware.js')[0]
const getUserFrom = require('./utils/middleware.js')[1]
const mongoose = require('mongoose')
const config = require('./utils/config')

const mongoUrl =  process.env.NODE_ENV === 'test'
? config.MONGODBTEST_URI
: config.MONGODB_URI

mongoose.connect(mongoUrl)
    .then((_result) => {
        console.log("connected to MongoDB")
    })
    .catch((error) => {
        console.log("error connecting to MongoDB:", error.message)
})

app.use(cors())
app.use(express.json())
app.use(getTokenFrom)
app.use('/api/blogs', getUserFrom, blogsRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/reset.js')
    app.use('/api/testing', testingRouter)
  }
module.exports = app