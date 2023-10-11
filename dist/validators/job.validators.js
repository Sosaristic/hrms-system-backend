"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobStatusSchema = exports.addJobSchema = void 0;
var zod_1 = require("zod");
var jobTypeStatus;
(function (jobTypeStatus) {
    jobTypeStatus["ONSITE"] = "ONSITE";
    jobTypeStatus["REMOTE"] = "REMOTE";
    jobTypeStatus["HYBRID"] = "HYBRID";
})(jobTypeStatus || (jobTypeStatus = {}));
exports.addJobSchema = zod_1.z.object({
    department: zod_1.z.string(),
    title: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    salary: zod_1.z.coerce.number(),
    jobType: zod_1.z.nativeEnum(jobTypeStatus, {
        required_error: "Invalid  JobType ",
    }),
});
var jobStatus;
(function (jobStatus) {
    jobStatus["ACTIVE"] = "ACTIVE";
    jobStatus["CLOSE"] = "CLOSE";
})(jobStatus || (jobStatus = {}));
exports.jobStatusSchema = zod_1.z.object({
    status: zod_1.z.nativeEnum(jobStatus, {
        required_error: "Invalid Job Status",
    }),
});
//# sourceMappingURL=job.validators.js.map