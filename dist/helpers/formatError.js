"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatError = void 0;
const formatError = (error) => {
    return error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
    }));
};
exports.formatError = formatError;
