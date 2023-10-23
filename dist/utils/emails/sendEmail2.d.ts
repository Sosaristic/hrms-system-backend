export interface EmailConfigProp {
    service: string;
    host: string;
    port: number;
    secure: boolean;
    debug: boolean;
    auth: {
        user: string;
        pass: string;
    };
    tls: {
        rejectUnauthorized: boolean;
    };
}
type EmailType = {
    email: string;
    subject: string;
    html: string;
};
export declare const sendEmail: ({ email, subject, html }: EmailType) => void;
export {};
