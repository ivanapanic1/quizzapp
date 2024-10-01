import connection from "../db";
import CountryFlagMatchingQuestion from "../entity/games/CountryFlagMatchingQuestion";
import MathQuestion from "../entity/games/MathQuestion";
import {OkPacket} from "mysql2";
import {ServerAnswer, userAnswer} from "../models/questionDTO";
import {randomUUID} from "crypto";

interface ICountryFlagMatchingQuestionRepository {
    save(question: CountryFlagMatchingQuestion): Promise<CountryFlagMatchingQuestion>;
    retrieveAll(): Promise<CountryFlagMatchingQuestion[]>;
    retrieveById(questionId: string): Promise<CountryFlagMatchingQuestion | undefined>;
    update(question: CountryFlagMatchingQuestion): Promise<number>;
    delete(questionId: number): Promise<number>;
    deleteAll(): Promise<number>;
}

class CountryFlagMatchingQuestionRepository implements ICountryFlagMatchingQuestionRepository{
    delete(questionId: number): Promise<number> {
        return Promise.resolve(0);
    }

    deleteAll(): Promise<number> {
        return Promise.resolve(0);
    }

    retrieveAll(): Promise<CountryFlagMatchingQuestion[]> {
        return Promise.resolve([]);
    }

    retrieveById(questionId: string): Promise<CountryFlagMatchingQuestion | undefined> {
        let query: string="SELECT q.id, q.questionText, q.correctAnswer,q.timeLimit, q.points, mq.flagOptions " +
            "FROM Question q JOIN CountryFlagMatchingQuestion mq ON q.id = mq.id WHERE q.id = ?;"
        return new Promise((resolve,reject)=>{
            connection.query<CountryFlagMatchingQuestion[]>(query,questionId,(err,res)=>{
                if(err){console.log("error in finding by id"); reject(err);}
                else resolve(res?.[0]);
            });
        });
    }
    retrieveRandom(): Promise<CountryFlagMatchingQuestion | undefined> {
        let query: string="SELECT * FROM CountryFlagMatchingQuestion mq JOIN question q where mq.id=q.id ORDER BY RAND() LIMIT 1"
        return new Promise((resolve,reject)=>{
            connection.query<CountryFlagMatchingQuestion[]>(query,(err,res)=>{
                if(err){console.log("error in finding random question"); reject(err);}
                else{ resolve(res?.[0]);}
            });
        });
    }

    save(question: CountryFlagMatchingQuestion): Promise<CountryFlagMatchingQuestion> {
        return new Promise((resolve, reject) => {
            connection.query<OkPacket>(
                "INSERT INTO Question (id, questionText, correctAnswer, timeLimit, points) VALUES(?,?,?,?,?)",
                [question.id, question.questionText,question.correctAnswer,question.timeLimit,question.points],
                (err, res) => {
                    if (err){console.log("error in creating base question"); reject(err);}
                    else{
                        const generatedId = question.id!=undefined?question.id:"";

                        connection.query<OkPacket>("INSERT INTO CountryFlagMatchingQuestion (id,flagOptions) VALUES (?,?)",
                            [question.id,JSON.stringify(question.flagOptions)],
                            (err,res)=>{
                                if(err) {console.log("error in creating county matching question");console.log(err); reject(err);}
                                else
                                    this.retrieveById(generatedId).then(question=>
                                    {resolve(question!)})
                                        .catch(reject)}

                        )}
                }
            );
        });
    }

    update(question: CountryFlagMatchingQuestion): Promise<number> {
        return Promise.resolve(0);
    }
    async checkAnswer(answer: userAnswer): Promise<ServerAnswer> {
        const question= await this.retrieveById(answer.questionId);
        if (!question) {
            throw new Error("Question not found");
        }
        const response: ServerAnswer={
            correctAnswer:question.correctAnswer,
            point:answer.answer?.toLowerCase()===question.correctAnswer?.toLowerCase()?question.points:0
        };
        return Promise.resolve(response);
    }

}

export  default new CountryFlagMatchingQuestionRepository();