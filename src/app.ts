import path from "path";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import userRoute from "./routes/users.routes";
import authRoute from "./routes/auth.routes";
import morgan from "morgan";
import CustomError from "./utils/error/CustomError";
import errorController from "./controllers/error.controller";
import { loginBodySchema } from "./validators/auth.validators";
import { tryCatch } from "./utils/tryCatch";

dotenv.config();

const app = express();

// IMPLEMENT MIDDLEWARE
const corsOptions: CorsOptions = {
  credentials: true,
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  compression({
    level: 6,
    threshold: 10 * 1000,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("Uncaught Exception occured! Shutting down...");
  process.exit(1);
});

// app routes
app.post(
  "/test/",
  tryCatch(async (req, res) => {
    const data = await loginBodySchema.parseAsync(req.body);
    if (data) {
      return res.status(200).json({ success: true });
    }
  })
);
app.use("/api/v1/", userRoute);
app.use("/api/v1/", authRoute);

app.use(express.static(path.join(__dirname, "public")));

app.all("*", (req, res, next) => {
  const err = new CustomError(
    `Can't find ${req.originalUrl} on the server!`,
    404
  );
  next(err);
});

app.use(errorController);
export default app;
