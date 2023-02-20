const express = require("express")
const postRouter = express.Router()
const { PostModel } = require("../model/Post.model")

postRouter.get("/", async (req, res) => {
  let query = {}
  const { device, device1, device2 } = req.query
  if (device) {
    query.device = device
  } else if (device1 && device2) {
    query.device1 = device1
    query.device2 = device2
  }

  const posts = await PostModel.find(query)
  res.send(posts)
})
postRouter.post("/create", async (req, res) => {
  const payload = req.body
  const post = new PostModel(payload)
  await post.save()
  res.send({ msg: "Post Created" })
})
postRouter.get("/top", async (req, res) => {
  const note = new PostModel.find({ _id: req.Userid })
  await note.save()
  res.send({ msg: "Note Created" })
})

postRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id
  const posts = await PostModel.findOne({ _id: id })
  const userID_in_post = posts.user
  const userID_while_making_req = req.body.user
  try {
    if (userID_while_making_req === userID_in_post) {
      await PostModel.findByIdAndDelete({ _id: id })
      res.send({ msg: `Post has been deleted` })
    } else {
      res.send("this user has no permission to modify/delete")
    }
  } catch (err) {
    res.send(err.message)
  }
})
postRouter.patch("/update/:id", async (req, res) => {
  const payload = req.body
  const postID = req.params.id
  try {
    await PostModel.findByIdAndUpdate({ _id: postID }, payload)
    res.send({ msg: `Note has been updated` })
  } catch (err) {
    res.send(err.message)
  }
})

module.exports = {
  postRouter,
}
