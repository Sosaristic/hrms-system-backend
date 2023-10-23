"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var JobSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    jobType: {
        type: String,
        enum: ["ONSITE", "REMOTE", "HYBRID"],
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ["ACTIVE", "CLOSE"],
        default: "ACTIVE",
    },
    department: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Department",
    },
});
exports.JobModel = mongoose_1.default.model("Job", JobSchema);
//# sourceMappingURL=job.model.js.map