import connection from "../db";
import WordGeneratorQuestion from "../entity/games/WordGeneratorQuestion";
import MathQuestion from "../entity/games/MathQuestion";
import {OkPacket} from "mysql2";
import {ServerAnswer, userAnswer} from "../models/questionDTO";
import {randomUUID} from "crypto";

interface IWordGeneratorQuestionRepository {
    save(question: WordGeneratorQuestion): Promise<WordGeneratorQuestion>;
    retrieveAll(): Promise<WordGeneratorQuestion[]>;
    retrieveById(questionId: string): Promise<WordGeneratorQuestion | undefined>;
    update(question: WordGeneratorQuestion): Promise<number>;
    delete(questionId: number): Promise<number>;
    deleteAll(): Promise<number>;
}

class WordGeneratorQuestionRepository implements IWordGeneratorQuestionRepository{
    delete(questionId: number): Promise<number> {
        return Promise.resolve(0);
    }

    deleteAll(): Promise<number> {
        return Promise.resolve(0);
    }

    retrieveAll(): Promise<WordGeneratorQuestion[]> {
        return Promise.resolve([]);
    }

    retrieveById(questionId: string): Promise<WordGeneratorQuestion | undefined> {
        let query: string="SELECT q.id, q.questionText, q.correctAnswer,q.timeLimit, q.points, mq.letters, mq.dictionary " +
            "FROM Question q JOIN WordGeneratorQuestion mq ON q.id = mq.id WHERE q.id = ?;"
        return new Promise((resolve,reject)=>{
            connection.query<WordGeneratorQuestion[]>(query,questionId,(err, res)=>{
                if(err){console.log("error in finding by id");console.log(err); reject(err);}
                else resolve(res?.[0]);
            });
        });
    }
    retrieveRandom(): Promise<WordGeneratorQuestion | undefined> {
        let query: string="SELECT * FROM WordGeneratorQuestion mq JOIN question q where mq.id=q.id ORDER BY RAND() LIMIT 1"
        return new Promise((resolve,reject)=>{
            connection.query<WordGeneratorQuestion[]>(query,(err, res)=>{
                if(err){console.log("error in finding random question"); reject(err);}
                else{ resolve(res?.[0]);}
            });
        });
    }

    save(question: WordGeneratorQuestion): Promise<WordGeneratorQuestion> {
        return new Promise((resolve, reject) => {
            connection.query<OkPacket>(
                "INSERT INTO Question (id, questionText, correctAnswer, timeLimit, points) VALUES(?,?,?,?,?)",
                [question.id, question.questionText,question.correctAnswer,question.timeLimit,question.points],
                (err, res) => {
                    if (err){console.log(err); console.log("error in creating base question");  reject(err);}
                    else{
                        const generatedId = question.id!=undefined?question.id:"";

                        connection.query<OkPacket>("INSERT INTO WordGeneratorQuestion (id,letters,dictionary) VALUES (?,?,?)",
                            [question.id,JSON.stringify(question.letters),JSON.stringify(question.dictionary)],
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

    update(question: WordGeneratorQuestion): Promise<number> {
        return Promise.resolve(0);
    }
    async checkAnswer(answer: userAnswer): Promise<ServerAnswer> {
        const question= await this.retrieveById(answer.questionId);
        if (!question) {
            throw new Error("Question not found");
        }
        const isInDictionary=question.dictionary.map(word => word.toLowerCase()).includes(answer.answer!.toLowerCase())

        const response: ServerAnswer={
            correctAnswer:question.correctAnswer,
            point:isInDictionary?answer.answer!.length:0
        };
        return Promise.resolve(response);
    }

}

export default new WordGeneratorQuestionRepository();