"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rejectionLetterTemplate = exports.offerLetterTemplate = exports.resetSuccessTemplate = exports.resetPasswordTemplate = void 0;
var resetPasswordTemplate = function (payload) {
    var html = "\n    <p>Hello ".concat(payload.name, ",</p>\n        <p>You have requested to reset your password. Please click the link below to reset your password:</p>\n        \n        <a href=\"").concat(payload.link, "\" style=\"display: inline-block; background-color: #007bff; color: #fff; margin-bottom: 0.5rem; padding: 10px 20px; text-decoration: none; border-radius: 5px;\">Reset Password</a>\n        <br/>\n        <b>Please note this link is valid for ").concat(payload.duration, "</b>\n\n        <p>if the reset button does not work here is the direct link</>\n        <a href=\"").concat(payload.link, "\">").concat(payload.link, "</a>\n        <p>If you did not request this, please ignore this email.</p>\n    ");
    return html;
};
exports.resetPasswordTemplate = resetPasswordTemplate;
var resetSuccessTemplate = function (payload) {
    var html = "\n    <p>Hello ".concat(payload.name, ",</p>\n        <p>You have Successfully reset your password</p>\n    \n        <p>If you did not request this, Kindly message our customer services.</p>\n        \n    ");
    return html;
};
exports.resetSuccessTemplate = resetSuccessTemplate;
var offerLetterTemplate = function (payload) {
    var html = "\n  <p style=\"font-size:1.5rem\">Dear ".concat(payload.name, ",</p>\n\n  <p>\n  We are thrilled to extend a formal offer of employment to you for the position of ").concat(payload.jobTitle, " at ").concat(payload.companyName, ". Your exceptional qualifications and experience have impressed us, and we believe you will be a valuable addition to our team.\n  </p> \n   <p>To accept this offer, please click on the following link within the next two weeks: <a href=\"").concat(payload.registerLink, "\">link</a>.</p> \n   <p>You will be directed to a secure portal to complete your registration and provide any necessary documentation.</p>\n   <p>\n   Should you have any questions or require further information, please do not hesitate to reach out to ").concat(payload.companyName, " at <a href=\"mail:").concat(payload.companyEmail, "\">").concat(payload.companyEmail, "</a>.\n   </p>\n  \n  <p>We are excited about the prospect of having you on board and look forward to your positive response.</p> \n  \n  <p>Welcome to ").concat(payload.companyName, "!</p> \n  \n  <p>Sincerely,</p> \n  \n  <p>").concat(payload.companyName, "</p>\n  <p>").concat(payload.companyEmail, "</p>\n  \n  ");
    return html;
};
exports.offerLetterTemplate = offerLetterTemplate;
var rejectionLetterTemplate = function (payload) {
    var html = "Dear ".concat(payload.name, ",\n\n  <p>I hope this message finds you well. We want to express our sincere appreciation for your interest in the ").concat(payload.jobTitle, " position at ").concat(payload.companyName, " . Your application was carefully reviewed, and we were impressed with your qualifications.</p> \n  \n  <p>After careful consideration, we regret to inform you that we have chosen to move forward with another candidate who closely aligns with our current needs.</p>  \n  <p>We genuinely value your time and effort in applying with us and wish you every success in your job search.</p>\n  \n  <p>Thank you for considering ").concat(payload.companyName, " as a potential employer.</p>\n  \n  \n  <p>Best regards,</p>\n  \n  <p> ").concat(payload.companyName, "</p>\n  \n  ");
    return html;
};
exports.rejectionLetterTemplate = rejectionLetterTemplate;
//# sourceMappingURL=emailTemplates.js.map