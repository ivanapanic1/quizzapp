"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToDTO = convertToDTO;
exports.countryConvertToDTO = countryConvertToDTO;
exports.wordGeneratorConvertToDTO = wordGeneratorConvertToDTO;
function convertToDTO(question) {
    const dto = {
        id: question.id,
        questionText: question.questionText,
        expression: question.expression,
        options: question.options,
        timeLimit: question.timeLimit
    };
    return dto;
}
function countryConvertToDTO(question) {
    const dto = {
        id: question.id,
        questionText: question.questionText,
        timeLimit: question.timeLimit,
        flagOptions: question.flagOptions
    };
    return dto;
}
function wordGeneratorConvertToDTO(question) {
    const dto = {
        id: question.id,
        questionText: question.questionText,
        timeLimit: question.timeLimit,
        letters: question.letters
    };
    return dto;
}
