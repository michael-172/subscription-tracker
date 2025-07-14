import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => res.send({ title: "Get all users" }));

userRouter.get("/:id", (req, res) => res.send({ title: "Get user details" }));

userRouter.post("/", (req, res) =>
  res.send({ title: "user created successfully" })
);

userRouter.put("/:id", (req, res) =>
  res.send({ title: "user updated successfully" })
);

userRouter.delete("/:id", (req, res) =>
  res.send({ title: "user deleted successfully" })
);

export default userRouter;
