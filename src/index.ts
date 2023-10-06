import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors, { CorsOptions } from "cors";
import connectDB from "./db/connect";
import dotenv from "dotenv";
import userRoute from "./routes/users.routes";
import morgan from "morgan";
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
  }),
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/api/v1/", userRoute);

const port = process.env.PORT || 3000;

const main = async () => {
  try {
    const isConnected = await connectDB();

    if (isConnected) {
      console.log("Database connected");
    } else {
      console.log("Database not connected");
    }

    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

main();
