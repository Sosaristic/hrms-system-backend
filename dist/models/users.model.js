"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var userSchema = new mongoose_1.default.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: String,
    enum: ["ADMIN", "STAFF"],
    default: "STAFF",
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  refreshToken: {
    type: String,
    select: false,
  },
});
exports.UserModel = mongoose_1.default.model("User", userSchema);
//# sourceMappingURL=users.model.js.map
