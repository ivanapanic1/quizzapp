"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToDTO = convertToDTO;
function convertToDTO(question) {
    const dto = {
        id: question.id,
        questionText: question.questionText,
        expression: question.expression,
        options: question.options
    };
    return dto;
}
