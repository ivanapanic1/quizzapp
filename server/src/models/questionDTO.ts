import MathQuestion from "../entity/games/MathQuestion";
import CountryFlagMatchingQuestion from "../entity/games/CountryFlagMatchingQuestion";


export interface mathQuestionDTO{
    id?:string;
    questionText?: string;
    expression?: string ;
    options?: number[];
    timeLimit?: number;
}

export interface countryFlagMatchingQuestionDTO{
    id?:string;
    questionText?: string;
    timeLimit?: number;
    flagOptions?: string[];
}

export interface wordGeneratorQuestionDTO{
    id?:string;
    questionText?: string;
    timeLimit?: number;
    letters?: string[];
}

export interface userAnswer{
    questionId:string;
    answer?: string;
}

export interface ServerAnswer {
    point?:number;
    correctAnswer?:string;
}


export function convertToDTO(question:MathQuestion):mathQuestionDTO{
    const dto: mathQuestionDTO = {
        id: question.id,
        questionText: question.questionText,
        expression: question.expression,
        options: question.options,
        timeLimit: question.timeLimit
    };

    return dto;
}

export function countryConvertToDTO(question:CountryFlagMatchingQuestion):countryFlagMatchingQuestionDTO{
    const dto: countryFlagMatchingQuestionDTO = {
        id: question.id,
        questionText: question.questionText,
        timeLimit: question.timeLimit,
        flagOptions: question.flagOptions
    };

    return dto;
}

export function wordGeneratorConvertToDTO(question:wordGeneratorQuestionDTO):wordGeneratorQuestionDTO{
    const dto: wordGeneratorQuestionDTO = {
        id: question.id,
        questionText: question.questionText,
        timeLimit: question.timeLimit,
        letters:question.letters
    };

    return dto;
}