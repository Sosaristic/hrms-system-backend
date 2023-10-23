"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFromCloudinry =
  exports.uploadToCloudinary =
  exports.verifyJwt =
  exports.createJwt =
  exports.comparePassword =
  exports.hashPassword =
  exports.authentication =
  exports.generateSessionToken =
  exports.generateSalt =
  exports.generateHash =
  exports.generateRandomString =
    void 0;
var crypto_1 = __importDefault(require("crypto"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var CustomError_1 = __importDefault(require("../error/CustomError"));
var cloudinary_1 = require("cloudinary");
var generateRandomString = function (length) {
  return crypto_1.default.randomBytes(length).toString("hex");
};
exports.generateRandomString = generateRandomString;
var generateHash = function (password, salt) {
  return crypto_1.default
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
};
exports.generateHash = generateHash;
var generateSalt = function () {
  return crypto_1.default.randomBytes(16).toString("hex");
};
exports.generateSalt = generateSalt;
var generateSessionToken = function () {
  return crypto_1.default.randomBytes(64).toString("hex");
};
exports.generateSessionToken = generateSessionToken;
var authentication = function (salt, password) {
  return crypto_1.default
    .createHmac("sha256", [salt, password].join("/"))
    .update(process.env.SECRET);
};
exports.authentication = authentication;
//  HASHING AND COMPARISON
var hashPassword = function (password) {
  return __awaiter(void 0, void 0, void 0, function () {
    var salt;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [
            4 /*yield*/,
            bcrypt_1.default.genSalt(Number(process.env.SALT)),
          ];
        case 1:
          salt = _a.sent();
          return [2 /*return*/, bcrypt_1.default.hash(password, salt)];
      }
    });
  });
};
exports.hashPassword = hashPassword;
var comparePassword = function (password, hash) {
  return bcrypt_1.default.compare(password, hash);
};
exports.comparePassword = comparePassword;
var createJwt = function (user, options) {
  var token = jsonwebtoken_1.default.sign(
    { userId: user.userId, role: user.role },
    process.env.JWT_SECRET,
    options,
  );
  return token;
};
exports.createJwt = createJwt;
var verifyJwt = function (token) {
  try {
    var decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new CustomError_1.default("Invalid Token", 403);
  }
};
exports.verifyJwt = verifyJwt;
// Cloudinary
var uploadToCloudinary = function (_a) {
  var file = _a.file,
    folder = _a.folder;
  return __awaiter(void 0, void 0, void 0, function () {
    var data, error_1;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            cloudinary_1.v2.uploader.upload(file, {
              folder: folder,
              resource_type: "raw",
            }),
          ];
        case 1:
          data = _b.sent();
          return [2 /*return*/, data];
        case 2:
          error_1 = _b.sent();
          console.log({ cloudyError: error_1 });
          throw new CustomError_1.default("Invalid File Type", 400);
        case 3:
          return [2 /*return*/];
      }
    });
  });
};
exports.uploadToCloudinary = uploadToCloudinary;
var deleteFromCloudinry = function (url) {
  return __awaiter(void 0, void 0, void 0, function () {
    var public_id, error_2;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          public_id = url.split("/").slice(-3).join("/").split(".")[0];
          _a.label = 1;
        case 1:
          _a.trys.push([1, 3, , 4]);
          return [4 /*yield*/, cloudinary_1.v2.uploader.destroy(public_id)];
        case 2:
          _a.sent();
          return [3 /*break*/, 4];
        case 3:
          error_2 = _a.sent();
          throw new CustomError_1.default("File cannot be deleted ", 400);
        case 4:
          return [2 /*return*/];
      }
    });
  });
};
exports.deleteFromCloudinry = deleteFromCloudinry;
//# sourceMappingURL=index.js.map
