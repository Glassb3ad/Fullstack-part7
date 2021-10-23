const userRouter = require('express').Router()
const User = require("../models/User.js")
const bcrypt = require('bcrypt')
const { response } = require('express')

userRouter.post('/', async (req, res) =>{
    const body = req.body
    if(body.password.length >= 3 && body.username.length >= 3){
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    //console.log(passwordHash)

    try{const user = new User({
        username: body.username,
        name: body.name,
        passwordHash: passwordHash
        })
        const savedUser = await user.save()

        res.json(savedUser)
    }
    catch(error){res.status(400).json({error: "username is already taken"})}}
    else {
        res.status(418).json({error: "Password or username is too short"})
    }
})

userRouter.get('/', async(req,res) => {
    res.json( await User.find({}).populate('blogs',{url: 1, title: 1, author: 1}))
})

module.exports = userRouter