import {Request, Response} from "express";
import {
    convertToDTO,
    countryConvertToDTO,
    flagGuessingConvertToDTO,
    ServerAnswer,
    userAnswer
} from "../models/questionDTO";
import path from "path";
import FlagGuessingQuestion from "../entity/games/FlagGuessingQuestion";
import flagGuessingQuestionRepository from "../repository/FlagGuessingQuestion.repository";
import {randomUUID} from "crypto";
import CountryFlagMatchingQuestion from "../entity/games/CountryFlagMatchingQuestion";

export default class flagGuessingQuestionController{
    async create(req:Request,res:Response){
        console.log(req.body)
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded or invalid file type.' });
        }
        const filePath = req.file.filename;
        const metadata:FlagGuessingQuestion = req.body.metadata ? JSON.parse(req.body.metadata) : {};

        if (!metadata) {
            return res.status(400).json({ message: 'No metadata provided' });
        }
        try{

            const question:FlagGuessingQuestion= metadata;
            question.id=randomUUID().toString();
            question.flagPath=filePath;
            console.log(question)
            const savedQuestion=await flagGuessingQuestionRepository.save(question);
            res.status(201).send(savedQuestion);

        }catch (err){
            res.status(500).json({
                message:"Internal Server Error!"
            })
        }
    }

    async getRandom(req:Request,res:Response){
        try{
            const question=await flagGuessingQuestionRepository.retrieveRandom();
            res.status(200).send(flagGuessingConvertToDTO(question!));
        }catch (err){
            console.log(err);
            res.status(500).json({
                message:"Internal Server Error!"
            })
        }
    }
    async checkAnswer(req:Request,res:Response){
        if (!req.body.answer || !req.body.questionId) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        }
        try{
            const answer:userAnswer=req.body;
            const serverAnswer:ServerAnswer=await flagGuessingQuestionRepository.checkAnswer(answer);
            res.status(200).send(serverAnswer);
        }catch (err){
            res.status(500).json({
                message:"Internal Server Error!"
            })
        }
    }

}