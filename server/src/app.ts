import express from "express";
import cors from "cors";
import {authRouter} from "./routes/auth.routes.js";
import {userRouter} from "./routes/user.routes.js";
const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Flow...");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);

export default app;
