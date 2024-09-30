export class Question {
    id?: string;
    questionText!: string;
    correctAnswer!: string;
    points!: number;
    timeLimit!: number;
}
export class MathQuestion extends Question{
    expression!: string ;
    options!: string[];
}