import MathQuestion from "../entity/games/MathQuestion";
import CountryFlagMatchingQuestion from "../entity/games/CountryFlagMatchingQuestion";
import FlagGuessingQuestion from "../entity/games/FlagGuessingQuestion";

export interface mathQuestionDTO{
    id?:string;
    questionText?: string;
    timeLimit?: number;
    expression?: string ;
    options?: number[];
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
export interface flagGuessingDTO{
    id?:string;
    questionText?: string;
    timeLimit?: number;
    flagPath?:string;
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
        timeLimit: question.timeLimit,
        expression: question.expression,
        options: question.options
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
export function flagGuessingConvertToDTO(question:FlagGuessingQuestion):flagGuessingDTO{
    console.log(question)
    const dto: flagGuessingDTO = {
        id: question.id,
        questionText: question.questionText,
        timeLimit: question.timeLimit,
        flagPath:question.flagPath
    };

    return dto;
}