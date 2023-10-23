import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import CustomError from "../error/CustomError";
import { v2 as cloudinary } from "cloudinary";

export const generateRandomString = (length: number) => {
  return crypto.randomBytes(length).toString("hex");
};

export const generateHash = (password: string, salt: string) => {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
};

export const generateSalt = () => {
  return crypto.randomBytes(16).toString("hex");
};

export const generateSessionToken = () => {
  return crypto.randomBytes(64).toString("hex");
};

export const authentication = (salt: string, password: string) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(process.env.SECRET);
};

//  HASHING AND COMPARISON

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  return bcrypt.hash(password, salt);
};
export const comparePassword = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

// CREATE JWT TOKEN
type JWTUSER = {
  userId: string;
  role?: string;
};

type optionsType = { expiresIn: string | number };
export const createJwt = (user: JWTUSER, options: optionsType) => {
  const token = jwt.sign(
    { userId: user.userId, role: user.role },
    process.env.JWT_SECRET,
    options,
  );
  return token;
};

export const verifyJwt = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded as { userId: string; role?: string };
  } catch (error) {
    throw new CustomError("Invalid Token", 403);
  }
};

// Cloudinary
export const uploadToCloudinary = async ({ file, folder }) => {
  try {
    const data = await cloudinary.uploader.upload(file, {
      folder: folder,
      resource_type: "raw",
    });
    return data;
  } catch (error) {
    console.log({ cloudyError: error });
    throw new CustomError("Invalid File Type", 400);
  }
};

export const deleteFromCloudinry = async (url: string) => {
  const public_id = url.split("/").slice(-3).join("/").split(".")[0];
  try {
    await cloudinary.uploader.destroy(public_id);
  } catch (error) {
    throw new CustomError("File cannot be deleted ", 400);
  }
};
