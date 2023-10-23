/// <reference types="node" />
import crypto from "crypto";
export declare const generateRandomString: (length: number) => string;
export declare const generateHash: (password: string, salt: string) => string;
export declare const generateSalt: () => string;
export declare const generateSessionToken: () => string;
export declare const authentication: (
  salt: string,
  password: string,
) => crypto.Hmac;
export declare const hashPassword: (password: string) => Promise<string>;
export declare const comparePassword: (
  password: string,
  hash: string,
) => Promise<boolean>;
type JWTUSER = {
  userId: string;
  role?: string;
};
type optionsType = {
  expiresIn: string | number;
};
export declare const createJwt: (user: JWTUSER, options: optionsType) => string;
export declare const verifyJwt: (token: string) => {
  userId: string;
  role?: string;
};
export declare const uploadToCloudinary: ({
  file,
  folder,
}: {
  file: any;
  folder: any;
}) => Promise<import("cloudinary").UploadApiResponse>;
export declare const deleteFromCloudinry: (url: string) => Promise<void>;
export {};
