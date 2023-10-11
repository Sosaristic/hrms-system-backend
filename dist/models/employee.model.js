"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var employeeSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    employmentStatus: {
        type: String,
        enum: ["ACTIVE", "ON LEAVE"],
        default: "ACTIVE",
    },
    imageUrl: {
        type: String,
    },
    joinDate: {
        type: Date,
        default: Date.now,
    },
    phoneNumber: {
        type: Number,
    },
    salary: {
        type: Number,
    },
    gender: {
        type: String,
        enum: ["MALE", "FEMALE"],
    },
    job: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Job",
    },
    department: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Department",
    },
});
exports.EmployeeModel = mongoose_1.default.model("Employee", employeeSchema);
//# sourceMappingURL=employee.model.js.map