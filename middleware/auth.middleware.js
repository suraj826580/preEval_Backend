const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const tokverify = jwt.verify(token.split(" ")[1], "masai");
    if (tokverify) {
      req.body.teacherRelation = tokverify.teacherRelation;
      next();
    } else {
      res.send({ msg: "token is not verified" });
    }
  } else {
    res.status(400).send({ msg: "Login First" });
  }
};

module.exports = { auth };
