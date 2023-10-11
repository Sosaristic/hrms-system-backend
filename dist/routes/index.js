"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeRoute = exports.departmentRoute = exports.candidateRoute = exports.jobRoute = exports.authRoute = exports.userRoute = void 0;
var users_routes_1 = require("./users.routes");
Object.defineProperty(exports, "userRoute", { enumerable: true, get: function () { return __importDefault(users_routes_1).default; } });
var auth_routes_1 = require("./auth.routes");
Object.defineProperty(exports, "authRoute", { enumerable: true, get: function () { return __importDefault(auth_routes_1).default; } });
var job_routes_1 = require("./job.routes");
Object.defineProperty(exports, "jobRoute", { enumerable: true, get: function () { return __importDefault(job_routes_1).default; } });
var candidate_routes_1 = require("./candidate.routes");
Object.defineProperty(exports, "candidateRoute", { enumerable: true, get: function () { return __importDefault(candidate_routes_1).default; } });
var department_routes_1 = require("./department.routes");
Object.defineProperty(exports, "departmentRoute", { enumerable: true, get: function () { return __importDefault(department_routes_1).default; } });
var employee_routes_1 = require("./employee.routes");
Object.defineProperty(exports, "employeeRoute", { enumerable: true, get: function () { return __importDefault(employee_routes_1).default; } });
//# sourceMappingURL=index.js.map