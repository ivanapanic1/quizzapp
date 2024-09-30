import MathQuestion from "../entity/games/MathQuestion";

export interface mathQuestionDTO{
    id?:string;
    questionText?: string;
    expression?: string ;
    options?: number[];
    timeLimit?: number;
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