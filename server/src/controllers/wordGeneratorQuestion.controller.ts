import {Request, response, Response} from "express"
import User from "../entity/user/user.model";
import userRepository from "../repository/user.repository";
import { ServerAnswer, userAnswer, wordGeneratorConvertToDTO} from "../models/questionDTO";
import wordGeneratorQuestionRepository from "../repository/WordGeneratorQuestionRepository";
import WordGeneratorQuestion from "../entity/games/WordGeneratorQuestion";
import {randomUUID} from "crypto";

export default class wordGeneratorQuestionController{
    async create(req:Request,res:Response){
        if (!req.body) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        }

        try{
            req.body.id=randomUUID().toString();
            const question:WordGeneratorQuestion= req.body;
            const savedQuestion=await wordGeneratorQuestionRepository.save(question);
            res.status(201).send(savedQuestion);

        }catch (err){
            res.status(500).json({
                message:"Internal Server Error!"
            })
        }
    }

    async getRandom(req:Request,res:Response){
        try{
            const question=await wordGeneratorQuestionRepository.retrieveRandom();
            res.status(200).send(wordGeneratorConvertToDTO(question!));
        }catch (err){
            res.status(500).json({
                message:"Internal Server Error!"
            })
        }
    }
    async checkAnswer(req:Request,res:Response){
        if (!req.body.answer || !req.body.questionId) {
            console.log(req.body)
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        }
        try{
            const answer:userAnswer=req.body;
            const serverAnswer:ServerAnswer=await wordGeneratorQuestionRepository.checkAnswer(answer);
            res.status(200).send(serverAnswer);
        }catch (err){
            res.status(500).json({
                message:"Internal Server Error!"
            })
        }
    }

}
