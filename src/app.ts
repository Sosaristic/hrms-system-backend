import path from "path";
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import CustomError from "./utils/error/CustomError";
import errorController from "./controllers/error.controller";
import {
  authRoute,
  candidateRoute,
  departmentRoute,
  employeeRoute,
  jobRoute,
} from "./routes";
import { cloudinaryConfig } from "./db/cloudinary";

dotenv.config();

const app = express();

// IMPLEMENT MIDDLEWARE
const corsOptions: CorsOptions = {
  credentials: true,
  origin: [
    "http://localhost:3000",
    "http://localhost:5000",
    process.env.CLIENT_URL,
  ],
};
cloudinaryConfig();
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  compression({
    level: 6,
    threshold: 10 * 1000,
  }),
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("Uncaught Exception occured! Shutting down...");
  process.exit(1);
});

// app routes
// app.use("/api/v1/", userRoute);

app.use(express.static(path.join(__dirname, "public")));
app.get("/", async (req: Request, res: Response) => {
  return res.send("<h1>Welcome to HRMS API</h1>");
});

app.use("/api/v1/auth/", authRoute);
app.use("/api/v1/candidate/", candidateRoute);
app.use("/api/v1/job/", jobRoute);
app.use("/api/v1/department/", departmentRoute);
app.use("/api/v1/employee/", employeeRoute);

app.all("*", (req, res, next) => {
  const err = new CustomError(
    `Can't find ${req.originalUrl} on the server!`,
    404,
  );
  next(err);
});

app.use(errorController);
export default app;
