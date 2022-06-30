const { Router } = require("express");

const userRouter = Router();

userRouter.get("/", (__req, res) => {
  res.json({
    ok: true,
    msg: "Hello world",
  });
});

userRouter.get("/:id", (req, res) => {
  const { id } = req.params;

  if (id === "user0001") {
    return res.json({
      ok: true,
      msg: `user with id ${id}`,
    });
  }

  return res
    .status(404)
    .json({ ok: false, msg: `user with id ${id} not found` });
});

userRouter.post("/", (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    return res.status(201).json({
      ok: true,
      msg: `user ${username} created`,
    });
  }

  return res
    .status(400)
    .json({ ok: false, msg: "username and password are required" });
});

module.exports = userRouter;
