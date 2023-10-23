"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
var nodemailer_1 = __importDefault(require("nodemailer"));
var CustomError_1 = __importDefault(require("../error/CustomError"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var nodemailerConfig = {
  service: process.env.SERVICE,
  host: process.env.GMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false,
  debug: true,
  // logger: true,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
};
var sendEmail = function (_a) {
  var email = _a.email,
    subject = _a.subject,
    html = _a.html;
  try {
    var transporter = nodemailer_1.default.createTransport(nodemailerConfig);
    transporter.sendMail({
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: subject,
      html: html,
    });
  } catch (error) {
    console.log({ error: error });
    throw new CustomError_1.default("Email failed to send", 400);
  }
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=sendEmail2.js.map
