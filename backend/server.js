import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import gigRouter from "./routes/gig.js";
import reviewRouter from "./routes/review.js";
import orderRouter from "./routes/order.js";
import conversationRouter from "./routes/conversation.js";
import messageRouter from "./routes/message.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors({ origin: "https://showcazz.netlify.app", credentials: true }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "something went wrong";
  return res.status(errorStatus).send(errorMessage);
});

/* ROUTES */
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/gig", gigRouter);
app.use("/review", reviewRouter);
app.use("/order", orderRouter);
app.use("/conversation", conversationRouter);
app.use("/message", messageRouter);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
