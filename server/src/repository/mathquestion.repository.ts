import MathQuestion from "../entity/games/MathQuestion";
import connection from "../db";
import {OkPacket} from "mysql2";
import User from "../entity/user/user.model";
import {ServerAnswer, userAnswer} from "../models/questionDTO";

interface IMathQuestionRepository {
    save(question: MathQuestion): Promise<MathQuestion>;
    retrieveAll(): Promise<MathQuestion[]>;
    retrieveById(questionId: string): Promise<MathQuestion | undefined>;
    update(question: MathQuestion): Promise<number>;
    delete(questionId: number): Promise<number>;
    deleteAll(): Promise<number>;
}

class MathQuestionRepository implements IMathQuestionRepository{
    delete(questionId: number): Promise<number> {
        return Promise.resolve(0);
    }

    deleteAll(): Promise<number> {
        return Promise.resolve(0);
    }

    retrieveAll(): Promise<MathQuestion[]> {
        return Promise.resolve([]);
    }


    retrieveById(questionId: string): Promise<MathQuestion | undefined> {
        let query: string="SELECT q.id, q.questionText, q.correctAnswer, q.timeLimit, q.points, mq.expression, mq.options " +
            "FROM Question q JOIN MathQuestion mq ON q.id = mq.id WHERE q.id = ?;"
        return new Promise((resolve,reject)=>{
            connection.query<MathQuestion[]>(query,questionId,(err,res)=>{
                if(err){console.log("error in finding by id"); reject(err);}
                else resolve(res?.[0]);
            });
        });
    }
    retrieveRandom(): Promise<MathQuestion | undefined> {
        let query: string="SELECT * FROM MathQuestion mq JOIN question q where mq.id=q.id ORDER BY RAND() LIMIT 1"
        return new Promise((resolve,reject)=>{
            connection.query<MathQuestion[]>(query,(err,res)=>{
                if(err){console.log("error in finding random question"); reject(err);}
                else{console.log(res?.[0]); resolve(res?.[0]);}
            });
        });
    }
    save(question: MathQuestion): Promise<MathQuestion> {
        return new Promise((resolve, reject) => {
            connection.query<OkPacket>(
                "INSERT INTO Question (id, questionText, correctAnswer, timeLimit, points) VALUES(?,?,?,?,?)",
                [question.id, question.questionText,question.correctAnswer,question.timeLimit,question.points],
                (err, res) => {
                    if (err){console.log(err); console.log("error in creating base question");  reject(err);}
                    else
                    {
                        const generatedId=question.id;
                        connection.query<OkPacket>("INSERT INTO MathQuestion (id, expression, options) VALUES (?, ?, ?)",
                            [question.id,question.expression,JSON.stringify(question.options)],
                            (err,res)=>{
                            if(err) {console.log(err); console.log("error in creating math question"); reject(err);}
                            else
                                this.retrieveById(generatedId!).then(question=>
                                {resolve(question!)})
                            }
                        )
                    }
                }
            );
        });
    }


    update(question: MathQuestion): Promise<number> {
        return Promise.resolve(0);
    }
    async checkAnswer(answer: userAnswer): Promise<ServerAnswer> {
       const question= await this.retrieveById(answer.questionId);
        if (!question) {
            throw new Error("Question not found");
        }
        const response: ServerAnswer={
            correctAnswer:question.correctAnswer,
            point:question.correctAnswer == answer.answer? question.points:0
        };
       return Promise.resolve(response);
    }

}
export default new MathQuestionRepository();