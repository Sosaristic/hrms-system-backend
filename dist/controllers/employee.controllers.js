"use strict";
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
exports.singleEmployee = exports.allEmployee = exports.registerEmployee = void 0;
// import { UserModel } from "../models/users.model";
// import { comparePassword, createJwt, verifyJwt } from "../utils/helpers";
// import CustomError from "../utils/error/CustomError";
var tryCatch_1 = require("../utils/tryCatch");
var employee_validators_1 = require("../validators/employee.validators");
var candidate_model_1 = require("../models/candidate.model");
var CustomError_1 = __importDefault(require("../utils/error/CustomError"));
var employee_model_1 = require("../models/employee.model");
var users_model_1 = require("../models/users.model");
var helpers_1 = require("../utils/helpers");
exports.registerEmployee = (0, tryCatch_1.tryCatch)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, candidateId, gender, image, password, candidate, passwordHash, user, imageFile;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = employee_validators_1.addEmployeeSchema.parse(req.body), candidateId = _a.candidateId, gender = _a.gender, image = _a.image, password = _a.password;
                return [4 /*yield*/, candidate_model_1.CandidateModel.findOne({
                        _id: candidateId,
                    }).populate("job job.department")];
            case 1:
                candidate = _b.sent();
                if (!candidate.$isValid) {
                    throw new CustomError_1.default("Candidate not found", 404);
                }
                return [4 /*yield*/, (0, helpers_1.hashPassword)(password)];
            case 2:
                passwordHash = _b.sent();
                return [4 /*yield*/, users_model_1.UserModel.create({
                        name: candidate.name,
                        password: passwordHash,
                        email: candidate.email,
                        emailVerified: true,
                    })];
            case 3:
                user = _b.sent();
                return [4 /*yield*/, (0, helpers_1.uploadToCloudinary)({
                        file: image,
                        folder: "HRMS/Images",
                    })];
            case 4:
                imageFile = _b.sent();
                return [4 /*yield*/, employee_model_1.EmployeeModel.create({
                        user: user,
                        gender: gender,
                        imageUrl: imageFile.secure_url,
                        salary: candidate.job.salary,
                        phoneNumber: candidate.phoneNumber,
                        job: candidate.job,
                        department: candidate.job.department,
                    })];
            case 5:
                _b.sent();
                return [2 /*return*/, res.status(201).json({
                        status: "success",
                        message: "Account Successfully Created",
                    })];
        }
    });
}); });
exports.allEmployee = (0, tryCatch_1.tryCatch)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var page, limit, employees;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                page = Number(req.query.page) || 1;
                limit = Number(req.query.limit) || 10;
                return [4 /*yield*/, employee_model_1.EmployeeModel.find({})
                        .populate({
                        path: "user job department",
                    })
                        .skip((page - 1) * limit)
                        .limit(limit)
                        .exec()];
            case 1:
                employees = _a.sent();
                return [2 /*return*/, res.status(200).json({ status: "success", data: employees })];
        }
    });
}); });
exports.singleEmployee = (0, tryCatch_1.tryCatch)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, employee;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, employee_model_1.EmployeeModel.findOne({ _id: id })
                        .populate({
                        path: "user job department",
                    })
                        .exec()];
            case 1:
                employee = _a.sent();
                return [2 /*return*/, res.status(200).json({ status: "success", data: employee })];
        }
    });
}); });
//# sourceMappingURL=employee.controllers.js.map