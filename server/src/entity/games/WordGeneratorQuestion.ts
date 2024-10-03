import {Column, Entity} from "typeorm";
import Question from "./question.model";

export default interface WordGeneratorQuestion extends Question{
    letters: string[];
    dictionary:string[];
}