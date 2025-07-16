import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/sign-up", (req, res) => signUp(req, res));
authRouter.post("/sign-in", (req, res) => signIn(req, res));
// authRouter.post("/sign-out", (req, res) => signOut(req, res));

export default authRouter;
