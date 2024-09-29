export class Question {
    id?: string;
    questionText!: string;
    correctAnswer!: string;
    points!: number;
}
export class MathQuestion extends Question{
    expression!: string ;
    options!: string[];
}