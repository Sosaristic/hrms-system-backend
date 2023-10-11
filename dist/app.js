"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var compression_1 = __importDefault(require("compression"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var morgan_1 = __importDefault(require("morgan"));
var CustomError_1 = __importDefault(require("./utils/error/CustomError"));
var error_controller_1 = __importDefault(require("./controllers/error.controller"));
var routes_1 = require("./routes");
var cloudinary_1 = require("./db/cloudinary");
dotenv_1.default.config();
var app = (0, express_1.default)();
// IMPLEMENT MIDDLEWARE
var corsOptions = {
    credentials: true,
};
(0, cloudinary_1.cloudinaryConfig)();
app.use((0, cors_1.default)(corsOptions));
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, compression_1.default)({
    level: 6,
    threshold: 10 * 1000,
}));
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
process.on("uncaughtException", function (err) {
    console.log(err.name, err.message);
    console.log("Uncaught Exception occured! Shutting down...");
    process.exit(1);
});
// app routes
// app.use("/api/v1/", userRoute);
app.use("/api/v1/auth/", routes_1.authRoute);
app.use("/api/v1/candidate/", routes_1.candidateRoute);
app.use("/api/v1/job/", routes_1.jobRoute);
app.use("/api/v1/department/", routes_1.departmentRoute);
app.use("/api/v1/employee/", routes_1.employeeRoute);
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.all("*", function (req, res, next) {
    var err = new CustomError_1.default("Can't find ".concat(req.originalUrl, " on the server!"), 404);
    next(err);
});
app.use(error_controller_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map