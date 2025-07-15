import express from "express";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import { PORT } from "./config/env.js";
import connectDB from "./database/mongodb.js"; // Ensure this import is correct
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: false })); // Middleware to parse URL-encoded bodies
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

app.use(errorMiddleware);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connectDB();
});
