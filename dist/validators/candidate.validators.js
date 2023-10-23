"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.candidateAcceptSchema = exports.addCandidateSchema = void 0;
var zod_1 = require("zod");
exports.addCandidateSchema = zod_1.z.object({
  name: zod_1.z.string({ required_error: "Candidate name is required" }),
  email: zod_1.z
    .string({ required_error: "Candidate email is required" })
    .email(),
  jobId: zod_1.z.string({ required_error: "Job title name is required" }),
  resume: zod_1.z.string({ required_error: "Resume is required" }),
  phoneNumber: zod_1.z.coerce.number().optional(),
});
var candidateStatus;
(function (candidateStatus) {
  candidateStatus["SELECTED"] = "SELECTED";
  candidateStatus["REJECTED"] = "REJECTED";
  candidateStatus["IN_PROGRESS"] = "IN PROGRESS";
})(candidateStatus || (candidateStatus = {}));
exports.candidateAcceptSchema = zod_1.z.object({
  candidateStatus: zod_1.z.nativeEnum(candidateStatus, {
    required_error: "Invalid Candidate Status",
  }),
});
//# sourceMappingURL=candidate.validators.js.map
