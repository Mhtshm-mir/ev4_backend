const express = require("express")
const { UserModel } = require("../model/User.model")
const jwt = require("jsonwebtoken")
const userRouter = express.Router()
const bcrypt = require("bcrypt")

userRouter.post("/register", async (req, res) => {
  const { name, email, gender, password, age, city } = req.body
  const user = await UserModel.find({ email })
  try {
    if (user.length > 0) {
      res.send("User already exist, please login")
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) res.send({ msg: "Something went wrong", error: err.message })
        else {
          const user = UserModel({
            name,
            email,
            name,
            email,
            gender,
            age,
            city,
            password: hash,
          })
          await user.save()
          res.send({ msg: "New User has been registered" })
        }
      })
    }
  } catch (err) {
    res.send({ msg: "Something went wrong", error: err.message })
  }
})

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await UserModel.find({ email })
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, function (err, result) {
        if (result) {
          let token = jwt.sign({ userID: user[0]._id }, "masai")

          res.send({ msg: "logged in", token: token })
        } else {
          res.send("wrong password")
        }
      })
    } else {
      res.send("wrong email or password")
    }
  } catch (err) {
    res.send("no details found")
  }
})

module.exports = {
  userRouter,
}
