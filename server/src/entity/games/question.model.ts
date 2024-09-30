import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import {randomUUID} from "crypto";
import {RowDataPacket} from "mysql2";
export default interface Question extends RowDataPacket {
    id?: string;
    questionText?: string;
    correctAnswer?: string;
    timeLimit?: number;
    points?: number;
}