declare class CustomError extends Error {
    statusCode: number;
    status: string;
    isOperational: boolean;
    constructor(message: string, statusCode: number);
}
export default CustomError;
