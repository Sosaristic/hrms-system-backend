type messagePayloadType = {
    name: string;
    link?: string;
    duration?: string;
};
export declare const resetPasswordTemplate: (payload: messagePayloadType) => string;
export declare const resetSuccessTemplate: (payload: messagePayloadType) => string;
type offerMessagePayload = {
    name: string;
    jobTitle: string;
    companyName: string;
    companyEmail: string;
    registerLink: string;
};
export declare const offerLetterTemplate: (payload: offerMessagePayload) => string;
type rejectPayloadType = {
    name: string;
    jobTitle: string;
    companyName: string;
};
export declare const rejectionLetterTemplate: (payload: rejectPayloadType) => string;
export {};
