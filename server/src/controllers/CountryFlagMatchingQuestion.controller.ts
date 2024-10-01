import {Request, Response} from "express";
import {convertToDTO, countryConvertToDTO, ServerAnswer, userAnswer} from "../models/questionDTO";
import CountryFlagMatchingQuestion from "../entity/games/CountryFlagMatchingQuestion";
import countryFlagMatchingQuestionRepository from "../repository/CountryFlagMatchingQuestion.repository";
import path from "path";
import {randomUUID} from "crypto";

export default class countryFlagMatchingQuestionController{
    async create(req:Request,res:Response){
        if (!req.body && !req.files || !(req.files instanceof Array) || req.files.length === 0) {
            console.log(req.body)
            console.log(req.files)
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        }
        const metadata:CountryFlagMatchingQuestion = req.body.metadata ? JSON.parse(req.body.metadata) : {};

        if (!metadata) {
            return res.status(400).json({ message: 'No metadata provided' });
        }

        const filePaths = req.files.map(file => path.join(file.filename));

        try{
            const question:CountryFlagMatchingQuestion= metadata;
            question.id=randomUUID().toString();
            question.flagOptions=filePaths;
            question.correctAnswer= filePaths.find(value => value.toLowerCase().includes(question.correctAnswer!.toLowerCase()))
            const savedQuestion=await countryFlagMatchingQuestionRepository.save(question);
            res.status(201).send(savedQuestion);

        }catch (err){
            res.status(500).json({
                message:"Internal Server Error!"
            })
        }
    }

    async getRandom(req:Request,res:Response){
        try{
            const question=await countryFlagMatchingQuestionRepository.retrieveRandom();
            res.status(200).send(countryConvertToDTO(question!));
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
            const serverAnswer:ServerAnswer=await countryFlagMatchingQuestionRepository.checkAnswer(answer);
            res.status(200).send(serverAnswer);
        }catch (err){
            res.status(500).json({
                message:"Internal Server Error!"
            })
        }
    }

}