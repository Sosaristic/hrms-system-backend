"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var DepartmentSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    departmentHead: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Employee",
    },
});
exports.DepartmentModel = mongoose_1.default.model("Department", DepartmentSchema);
//# sourceMappingURL=department.model.js.map