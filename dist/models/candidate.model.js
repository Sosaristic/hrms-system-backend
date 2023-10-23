"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var candidateSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    candidateStatus: {
        type: String,
        enum: ["SELECTED", "IN PROGRESS", "REJECTED"],
        default: "IN PROGRESS",
    },
    job: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Job",
        require: true,
    },
    resume: {
        type: String,
        require: true,
    },
    phoneNumber: {
        type: Number,
    },
}, { timestamps: true });
exports.CandidateModel = mongoose_1.default.model("Candidate", candidateSchema);
//# sourceMappingURL=candidate.model.js.map