import FlagGuessingQuestion from "../entity/games/FlagGuessingQuestion";
import connection from "../db";
import {OkPacket} from "mysql2";
import {ServerAnswer, userAnswer} from "../models/questionDTO";

interface IFlagGuessingQuestionRepository {
    save(question: FlagGuessingQuestion): Promise<FlagGuessingQuestion>;
    retrieveAll(): Promise<FlagGuessingQuestion[]>;
    retrieveById(questionId: string): Promise<FlagGuessingQuestion | undefined>;
    update(question: FlagGuessingQuestion): Promise<number>;
    delete(questionId: number): Promise<number>;
    deleteAll(): Promise<number>;
}

class FlagGuessingQuestionRepository implements IFlagGuessingQuestionRepository{
    delete(questionId: number): Promise<number> {
        return Promise.resolve(0);
    }

    deleteAll(): Promise<number> {
        return Promise.resolve(0);
    }

    retrieveAll(): Promise<FlagGuessingQuestion[]> {
        return Promise.resolve([]);
    }

    retrieveById(questionId: string): Promise<FlagGuessingQuestion | undefined> {
        let query: string="SELECT q.id, q.questionText, q.correctAnswer,q.timeLimit, q.points, mq.flagPath " +
            "FROM Question q JOIN FlagGuessingQuestion mq ON q.id = mq.id WHERE q.id = ?;"
        return new Promise((resolve,reject)=>{
            connection.query<FlagGuessingQuestion[]>(query,questionId,(err,res)=>{
                if(err){console.log("error in finding by id"); reject(err);}
                else resolve(res?.[0]);
            });
        });
    }
    retrieveRandom(): Promise<FlagGuessingQuestion | undefined> {
        let query: string="SELECT * FROM FlagGuessingQuestion mq JOIN question q where mq.id=q.id ORDER BY RAND() LIMIT 1"
        return new Promise((resolve,reject)=>{
            connection.query<FlagGuessingQuestion[]>(query,(err,res)=>{
                if(err){console.log("error in finding random question"); reject(err);}
                else{console.log(res); resolve(res?.[0]);}
            });
        });
    }

    save(question: FlagGuessingQuestion): Promise<FlagGuessingQuestion> {
        return new Promise((resolve, reject) => {
            connection.query<OkPacket>(
                "INSERT INTO Question (id, questionText, correctAnswer, timeLimit, points) VALUES(?,?,?,?,?)",
                [question.id, question.questionText,question.correctAnswer,question.timeLimit,question.points],
                (err, res) => {
                    if (err){console.log("error in creating base question"); reject(err);}
                    else{
                        const generatedId = question.id!=undefined?question.id:"";

                        connection.query<OkPacket>("INSERT INTO FlagGuessingQuestion (id,flagPath) VALUES (?,?)",
                            [question.id,question.flagPath],
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

    update(question: FlagGuessingQuestion): Promise<number> {
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

export  default new FlagGuessingQuestionRepository();