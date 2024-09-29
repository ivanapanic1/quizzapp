import {Request, response, Response} from "express"
import User from "../entity/user/user.model";
import userRepository from "../repository/user.repository";
import MathQuestion from "../entity/games/MathQuestion";
import mathquestionRepository from "../repository/mathquestion.repository";
import {convertToDTO, ServerAnswer, userAnswer} from "../models/questionDTO";
import {randomUUID} from "crypto";

export default class mathQuestionController{
    async create(req:Request,res:Response){
        if (!req.body) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        }

        try{

            const question:MathQuestion= req.body;
            question.id=randomUUID().toString();
            const savedQuestion=await mathquestionRepository.save(question);
            console.log(savedQuestion)

            res.status(201).send(savedQuestion);

        }catch (err){
            console.log(err)
            res.status(500).json({
                message:"Internal Server Error!"
            })
        }
    }

    async getRandom(req:Request,res:Response){
        try{
            const question=await mathquestionRepository.retrieveRandom();
            res.status(200).send(convertToDTO(question!));
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
            const serverAnswer:ServerAnswer=await mathquestionRepository.checkAnswer(answer);
            res.status(200).send(serverAnswer);
        }catch (err){
            res.status(500).json({
                message:"Internal Server Error!"
            })
        }
    }

}
