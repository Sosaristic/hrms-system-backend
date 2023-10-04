import crypto from 'crypto';

export const generateRandomString = (length: number) => {
  return crypto.randomBytes(length).toString('hex');
};

export const generateHash = (password: string, salt: string) => {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
};

export const generateSalt = () => {
  return crypto.randomBytes(16).toString('hex');
};

export const generateSessionToken = () => {
  return crypto.randomBytes(64).toString('hex');
};

export const authentication = (salt: string, password: string) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(process.env.SECRET);
}