import { Entity, Column } from 'typeorm';
import Question from "./question.model";

export default interface MathQuestion extends Question{
    expression?: string ;
    options?: number[];
}