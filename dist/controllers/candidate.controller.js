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
exports.deleteCandidate = exports.rejectCandidate = exports.acceptCandidate = exports.singleCandidate = exports.allCandidate = exports.addCandidate = void 0;
var tryCatch_1 = require("../utils/tryCatch");
var candidate_model_1 = require("../models/candidate.model");
var CustomError_1 = __importDefault(require("../utils/error/CustomError"));
var candidate_validators_1 = require("../validators/candidate.validators");
var sendEmail2_1 = require("../utils/emails/sendEmail2");
var emailTemplates_1 = require("../utils/emails/emailTemplates");
var helpers_1 = require("../utils/helpers");
var job_model_1 = require("../models/job.model");
exports.addCandidate = (0, tryCatch_1.tryCatch)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, name, email, jobId, resume, phoneNumber, resumeFile, job, candidate;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = candidate_validators_1.addCandidateSchema.parse(req.body);
                name = data.name, email = data.email, jobId = data.jobId, resume = data.resume, phoneNumber = data.phoneNumber;
                return [4 /*yield*/, (0, helpers_1.uploadToCloudinary)({
                        file: resume,
                        folder: "HRMS/Resume",
                    })];
            case 1:
                resumeFile = _a.sent();
                return [4 /*yield*/, job_model_1.JobModel.findOne({ _id: jobId })];
            case 2:
                job = _a.sent();
                return [4 /*yield*/, candidate_model_1.CandidateModel.create({
                        name: name,
                        email: email,
                        job: job,
                        resume: resumeFile.secure_url,
                        phoneNumber: phoneNumber,
                    })];
            case 3:
                candidate = _a.sent();
                if (!candidate) {
                    throw new CustomError_1.default("Sorry, Error occur why registering this candidate", 400);
                }
                return [2 /*return*/, res.status(201).json({
                        status: "success",
                        message: "Candidate registered successfully",
                        data: candidate,
                    })];
        }
    });
}); });
exports.allCandidate = (0, tryCatch_1.tryCatch)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var page, limit, candidates;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                page = Number(req.query.page) || 1;
                limit = Number(req.query.limit) || 10;
                return [4 /*yield*/, candidate_model_1.CandidateModel.find({})
                        .populate({ path: "job", select: "title salary" })
                        .skip((page - 1) * limit)
                        .limit(limit)
                        .exec()];
            case 1:
                candidates = _a.sent();
                return [2 /*return*/, res.status(200).json({ status: "success", data: candidates })];
        }
    });
}); });
exports.singleCandidate = (0, tryCatch_1.tryCatch)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, candidate;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, candidate_model_1.CandidateModel.findOne({ _id: id }).populate("job")];
            case 1:
                candidate = _a.sent();
                if (!candidate) {
                    throw new CustomError_1.default("Candidate not found", 400);
                }
                return [2 /*return*/, res.status(200).json({ status: "success", data: candidate })];
        }
    });
}); });
exports.acceptCandidate = (0, tryCatch_1.tryCatch)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, candidate, subject, link, html;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, candidate_model_1.CandidateModel.findOneAndUpdate({ _id: id }, { $set: { candidateStatus: "SELECTED" } }, { new: true })
                        .populate("job")
                        .exec()];
            case 1:
                candidate = _a.sent();
                if (!candidate) {
                    throw new CustomError_1.default("Candidate not found", 400);
                }
                subject = "Offer Letter";
                link = "".concat(process.env.CLIENT_URL, "/employee/register/?id=").concat(candidate._id);
                html = (0, emailTemplates_1.offerLetterTemplate)({
                    name: candidate.name,
                    jobTitle: candidate.job.title,
                    companyEmail: process.env.EMAIL_ADDRESS,
                    companyName: "HRMS",
                    registerLink: link,
                });
                (0, sendEmail2_1.sendEmail)({ email: candidate.email, subject: subject, html: html });
                return [2 /*return*/, res.status(201).json({
                        status: "success",
                        message: "".concat(candidate.name, " offer letter sent successfully"),
                    })];
        }
    });
}); });
exports.rejectCandidate = (0, tryCatch_1.tryCatch)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, candidate, subject, html;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, candidate_model_1.CandidateModel.findOneAndUpdate({ _id: id }, { $set: { candidateStatus: "REJECTED" } }, { new: true }).exec()];
            case 1:
                candidate = _a.sent();
                if (!candidate) {
                    throw new CustomError_1.default("Candidate not found", 400);
                }
                subject = "Rejection Letter";
                html = (0, emailTemplates_1.rejectionLetterTemplate)({
                    name: candidate.name,
                    jobTitle: candidate.job.title,
                    companyName: "HRMS",
                });
                (0, sendEmail2_1.sendEmail)({ email: candidate.email, subject: subject, html: html });
                return [2 /*return*/, res.status(201).json({
                        status: "success",
                        message: "".concat(candidate.name, " rejection letter sent successfully"),
                    })];
        }
    });
}); });
exports.deleteCandidate = (0, tryCatch_1.tryCatch)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, candidate;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, candidate_model_1.CandidateModel.findOneAndDelete({ _id: id })];
            case 1:
                candidate = _a.sent();
                if (!candidate) {
                    throw new CustomError_1.default("Candidate not found", 400);
                }
                return [2 /*return*/, res.status(201).json({
                        status: "success",
                        message: "Candidate deleted successfully",
                    })];
        }
    });
}); });
//# sourceMappingURL=candidate.controller.js.map