const express = require("express")
const cors = require("cors")
const connection = require("./db")
const { userRouter } = require("./route/User.routes")
const { authenticate } = require("./middleware/authenticate.middleware")
const { postRouter } = require("./route/Post.routes")
const app = express()

app.use(express.json())
app.use(cors())
app.use("/users", userRouter)
app.use(authenticate)
app.use("/posts", postRouter)
app.listen(process.env.port, async () => {
  try {
    await connection
    console.log("connected to db")
  } catch (err) {
    console.log(err.message)
  }
})
