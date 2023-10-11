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
exports.deleteJob = exports.changeJobStatus = exports.singleJob = exports.allJobs = exports.addJob = void 0;
var tryCatch_1 = require("../utils/tryCatch");
var job_validators_1 = require("../validators/job.validators");
var department_model_1 = require("../models/department.model");
var job_model_1 = require("../models/job.model");
var CustomError_1 = __importDefault(require("../utils/error/CustomError"));
exports.addJob = (0, tryCatch_1.tryCatch)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, department, title, jobType, description, salary, dept, jobDepartment, job;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = job_validators_1.addJobSchema.parse(req.body);
                department = data.department, title = data.title, jobType = data.jobType, description = data.description, salary = data.salary;
                dept = department.toLowerCase();
                return [4 /*yield*/, department_model_1.DepartmentModel.findOne({ name: dept })];
            case 1:
                jobDepartment = _a.sent();
                if (!jobDepartment) {
                    throw new CustomError_1.default("Kindly provide a valid department for this job", 400);
                }
                return [4 /*yield*/, job_model_1.JobModel.create({
                        title: title,
                        jobType: jobType,
                        description: description,
                        salary: salary,
                        department: jobDepartment,
                    })];
            case 2:
                job = _a.sent();
                return [2 /*return*/, res.status(201).json({
                        status: "success",
                        message: "Job is added successfully",
                        data: job,
                    })];
        }
    });
}); });
exports.allJobs = (0, tryCatch_1.tryCatch)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var page, limit, jobs;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                page = Number(req.query.page) || 1;
                limit = Number(req.query.limit) || 10;
                return [4 /*yield*/, job_model_1.JobModel.find({})
                        .populate("department")
                        .skip((page - 1) * limit)
                        .limit(limit)
                        .exec()];
            case 1:
                jobs = _a.sent();
                if (!jobs) {
                    throw new CustomError_1.default("Sorry, Jobs not found", 404);
                }
                return [2 /*return*/, res.status(200).json({ status: "success", data: jobs })];
        }
    });
}); });
exports.singleJob = (0, tryCatch_1.tryCatch)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, job;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, job_model_1.JobModel.findOne({ _id: id }).populate("department")];
            case 1:
                job = _a.sent();
                if (!job) {
                    throw new CustomError_1.default("Sorry, Job not found", 404);
                }
                return [2 /*return*/, res.status(200).json({ status: "success", data: job })];
        }
    });
}); });
exports.changeJobStatus = (0, tryCatch_1.tryCatch)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, status, job;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                status = job_validators_1.jobStatusSchema.parse(req.body).status;
                return [4 /*yield*/, job_model_1.JobModel.findOneAndUpdate({ _id: id }, { $set: { status: status } }, { new: true }).exec()];
            case 1:
                job = _a.sent();
                if (!job) {
                    throw new CustomError_1.default("Sorry, Error Occur while updating job Status", 404);
                }
                return [2 /*return*/, res.status(201).json({
                        status: "success",
                        message: "Job is deleted successfully",
                    })];
        }
    });
}); });
exports.deleteJob = (0, tryCatch_1.tryCatch)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, job;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, job_model_1.JobModel.deleteOne({ _id: id })];
            case 1:
                job = _a.sent();
                if (!job) {
                    throw new CustomError_1.default("Sorry, Job not found", 404);
                }
                return [2 /*return*/, res.status(201).json({
                        status: "success",
                        message: "Job is deletedd successfully",
                    })];
        }
    });
}); });
//# sourceMappingURL=job.controller.js.map