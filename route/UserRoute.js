const express = require("express")
const router = express.Router()
const Users = require('../model/userModel')


router.post('/register', async (req, res) => {
    const form = req.body
    console.log(req.body)
    try {
        const user = new Users(req.body)
        await user.save()
        res.send({ message: 'success' })
    } catch (error) {
        res.send({ message: error })
    }
})



router.post('/login', async (req, res) => {

    const { email, password } = req.body
    console.log(req.body)

    const user = await Users.findOne({ email })

    if (!user) {
        res.send({ message: "User doesn't exist." })
    }


    if (user) {
        const isValidPassword = await user.comparePassword(password)

        if (!isValidPassword) {
            return res.send({ message: "Password is invalid" })
        }
        const token = await user.generateToken()
        res.send({ message: "Successfully logged in" })
        // res.send(user)
    }
     
})


router.get('/user/:data', async (req,res) => {
    const email = req.params.data
    // console.log(email)
    try {
        const result = await Users.findOne({email})
        res.send(result)
    } catch (error) {
        res.send({message: error})
    }
})


module.exports = router