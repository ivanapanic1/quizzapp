import { Entity, Column } from 'typeorm';
import Question from "./question.model";

export default interface FlagGuessingQuestion extends Question {
    flagPath: string;
}