"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmPasswordReset = exports.forgetPassword = exports.getToken = exports.authLogin = exports.confirmAdmin = exports.authRegister = exports.testRoute = void 0;
var users_model_1 = require("../models/users.model");
var helpers_1 = require("../utils/helpers");
var CustomError_1 = __importDefault(require("../utils/error/CustomError"));
var tryCatch_1 = require("../utils/tryCatch");
var auth_validators_1 = require("../validators/auth.validators");
var sendEmail2_1 = require("../utils/emails/sendEmail2");
var emailTemplates_1 = require("../utils/emails/emailTemplates");
var index_1 = require("../utils/helpers/index");
var testRoute = function (req, res) {
    return res.json({ message: "test...." });
};
exports.testRoute = testRoute;
// login
exports.authRegister = (0, tryCatch_1.tryCatch)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, password, existingUser, passwordHash, user, token, link, subject, html;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = auth_validators_1.registerBodySchema.parse(req.body), name = _a.name, email = _a.email, password = _a.password;
                return [4 /*yield*/, users_model_1.UserModel.findOne({ email: email })];
            case 1:
                existingUser = _b.sent();
                if (existingUser) {
                    return [2 /*return*/, res.status(400).json({ message: "User already exists" })];
                }
                return [4 /*yield*/, (0, index_1.hashPassword)(password)];
            case 2:
                passwordHash = _b.sent();
                return [4 /*yield*/, users_model_1.UserModel.create({
                        name: name,
                        email: email,
                        password: passwordHash,
                    })];
            case 3:
                user = _b.sent();
                token = (0, helpers_1.createJwt)({
                    userId: user._id,
                }, { expiresIn: 10 * 60 });
                link = "".concat(process.env.SERVER_URL, "/api/v1/auth/confirm/admin?token=").concat(token);
                subject = "Change to Admin";
                html = (0, emailTemplates_1.changeToAdminTemplate)({ name: user.name, link: link });
                (0, sendEmail2_1.sendEmail)({ email: user.email, subject: subject, html: html });
                res.status(201).json({ message: "User created successfully" });
                return [2 /*return*/];
        }
    });
}); });
exports.confirmAdmin = (0, tryCatch_1.tryCatch)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, decode, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = String(req.query.token);
                decode = (0, helpers_1.verifyJwt)(token);
                return [4 /*yield*/, users_model_1.UserModel.findOneAndUpdate({ _id: decode.userId }, {
                        $set: { role: "ADMIN", emailVerified: true },
                    })];
            case 1:
                user = _a.sent();
                return [2 /*return*/, res.status(201).send("<h2>Hi ".concat(user.name, ",</h2>\n          <p>Your account change to admin is successful</p>\n          <p>Kindly click below to login</p>\n          <a href=\"").concat(process.env.CLIENT_URL, "/login\" style=\"display: inline-block; background-color: #007bff; color: #fff; margin-bottom: 0.5rem; padding: 10px 20px; text-decoration: none; border-radius: 5px;\">Login</a>\n    "))];
        }
    });
}); });
exports.authLogin = (0, tryCatch_1.tryCatch)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, email, password, user, isMatch, accessToken, refreshToken, userData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = auth_validators_1.loginBodySchema.parse(req.body);
                email = data.email, password = data.password;
                return [4 /*yield*/, users_model_1.UserModel.findOne({ email: email }).select("+password")];
            case 1:
                user = _a.sent();
                if (!user) {
                    throw new CustomError_1.default("Invalid credentials", 400);
                }
                return [4 /*yield*/, (0, helpers_1.comparePassword)(password, user.password)];
            case 2:
                isMatch = _a.sent();
                if (!isMatch) {
                    throw new CustomError_1.default("Invalid credentials", 400);
                }
                if (!user.emailVerified && isMatch) {
                    return [2 /*return*/, res.status(203).json({
                            status: "pending",
                            message: "Kindly Confirm your email to activate your account",
                        })];
                }
                accessToken = (0, helpers_1.createJwt)({
                    userId: user._id,
                    role: user.role,
                }, { expiresIn: 15 * 60 } //expire in 15 minute
                );
                refreshToken = (0, helpers_1.createJwt)({
                    userId: user._id,
                    role: user.role,
                }, { expiresIn: 24 * 60 * 60 });
                res.cookie("refresh", refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "none",
                    maxAge: 24 * 60 * 60 * 1000,
                });
                userData = {
                    name: user.name,
                    email: user.email,
                    emailVerified: user.emailVerified,
                    role: user.role,
                    accessToken: accessToken,
                };
                user.refreshToken = refreshToken;
                return [4 /*yield*/, user.save()];
            case 3:
                _a.sent();
                return [2 /*return*/, res.status(201).json({ status: "success", user: userData })];
        }
    });
}); });
//
exports.getToken = (0, tryCatch_1.tryCatch)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var refresh, decoded, user, accessToken;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                refresh = req.cookies["refresh"];
                decoded = (0, helpers_1.verifyJwt)(refresh);
                return [4 /*yield*/, users_model_1.UserModel.findOne({ _id: decoded.userId })
                        .select("+refreshToken")
                        .lean()];
            case 1:
                user = _a.sent();
                if (!user.refreshToken === refresh) {
                    throw new CustomError_1.default("Not Authorized", 400);
                }
                accessToken = (0, helpers_1.createJwt)({
                    userId: user._id,
                    role: user.role,
                }, { expiresIn: 15 * 60 } //expire in 15 minute
                );
                return [2 /*return*/, res.status(200).json({ accessToken: accessToken })];
        }
    });
}); });
exports.forgetPassword = (0, tryCatch_1.tryCatch)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, email, user, token, link, subject, duration, html;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = auth_validators_1.emailBodySchema.parse(req.body);
                email = data.email;
                return [4 /*yield*/, users_model_1.UserModel.findOne({ email: email })];
            case 1:
                user = _a.sent();
                if (!user) {
                    throw new CustomError_1.default("Invalid Credentials", 400);
                }
                token = (0, helpers_1.createJwt)({
                    userId: user._id,
                }, { expiresIn: 10 * 60 });
                link = "".concat(process.env.CLIENT_URL, "/reset-password/?token=").concat(token);
                subject = "Password Reset Request";
                duration = "10 minutes";
                html = (0, emailTemplates_1.resetPasswordTemplate)({ name: user.name, link: link, duration: duration });
                (0, sendEmail2_1.sendEmail)({ email: user.email, subject: subject, html: html });
                return [2 /*return*/, res.status(200).json({
                        status: "success",
                        message: "Password email reset sent, Kindly check your email to reset your password",
                    })];
        }
    });
}); });
exports.confirmPasswordReset = (0, tryCatch_1.tryCatch)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tokenParams, _a, token, password, decode, passwordHash, user, html, subject;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                tokenParams = req.params.token;
                _a = auth_validators_1.passwordResetSchema.parse(__assign({ token: tokenParams }, req.body)), token = _a.token, password = _a.password;
                decode = (0, helpers_1.verifyJwt)(token);
                return [4 /*yield*/, (0, index_1.hashPassword)(password)];
            case 1:
                passwordHash = _b.sent();
                return [4 /*yield*/, users_model_1.UserModel.findOne({ _id: decode.userId })];
            case 2:
                user = _b.sent();
                if (!user) {
                    throw new CustomError_1.default("User not found", 400);
                }
                user.password = passwordHash;
                user.save();
                html = (0, emailTemplates_1.resetSuccessTemplate)({ name: user.name });
                subject = "Password Reset Successful";
                (0, sendEmail2_1.sendEmail)({ email: user.email, subject: subject, html: html });
                return [2 /*return*/, res
                        .status(201)
                        .json({ status: "success", message: "Password Successfully Reset" })];
        }
    });
}); });
//# sourceMappingURL=auth.controller.js.map