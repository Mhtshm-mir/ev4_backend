const jwt = require("jsonwebtoken")

const authenticate = (req, res, next) => {
  const token = req.headers.authorization
  console.log(token)
  if (token) {
    jwt.verify(token, "masai", (err, decoded) => {
      if (decoded) {
        req.body.user = decoded.userID
        next()
      } else {
        res.send({ msg: "incorrect token" })
      }
    })
  } else {
    res.send({ msg: "Please Login first" })
  }
}

module.exports = {
  authenticate,
}
