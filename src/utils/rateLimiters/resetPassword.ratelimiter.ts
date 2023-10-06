import rateLimit from "express-rate-limit";
export const resetPasswordLimiter = (limit, message) => {
    return rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  max: limit, // Max requests allowed in the windowMs duration
  message: message,
})
};
