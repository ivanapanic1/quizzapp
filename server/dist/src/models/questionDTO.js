"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToDTO = convertToDTO;
exports.countryConvertToDTO = countryConvertToDTO;
exports.wordGeneratorConvertToDTO = wordGeneratorConvertToDTO;
exports.flagGuessingConvertToDTO = flagGuessingConvertToDTO;
function convertToDTO(question) {
    const dto = {
        id: question.id,
        questionText: question.questionText,
        timeLimit: question.timeLimit,
        expression: question.expression,
        options: question.options
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
function flagGuessingConvertToDTO(question) {
    console.log(question);
    const dto = {
        id: question.id,
        questionText: question.questionText,
        timeLimit: question.timeLimit,
        flagPath: question.flagPath
    };
    return dto;
}
