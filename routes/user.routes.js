import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { getUsers, getUser } from "../controllers/user.controller.js";
import errorMiddleware from "../middlewares/error.middleware.js";

const userRouter = Router();

userRouter.get("/", authorize, getUsers);

userRouter.get("/:id", authorize, errorMiddleware, getUser);

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
