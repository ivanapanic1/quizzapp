import Question from "./question.model";

export default interface CountryFlagMatchingQuestion extends Question {
    flagOptions: string[];
}