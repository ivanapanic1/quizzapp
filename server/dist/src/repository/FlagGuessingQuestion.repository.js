"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
class FlagGuessingQuestionRepository {
    delete(questionId) {
        return Promise.resolve(0);
    }
    deleteAll() {
        return Promise.resolve(0);
    }
    retrieveAll() {
        return Promise.resolve([]);
    }
    retrieveById(questionId) {
        let query = "SELECT q.id, q.questionText, q.correctAnswer,q.timeLimit, q.points, mq.flagPath " +
            "FROM Question q JOIN FlagGuessingQuestion mq ON q.id = mq.id WHERE q.id = ?;";
        return new Promise((resolve, reject) => {
            db_1.default.query(query, questionId, (err, res) => {
                if (err) {
                    console.log("error in finding by id");
                    reject(err);
                }
                else
                    resolve(res === null || res === void 0 ? void 0 : res[0]);
            });
        });
    }
    retrieveRandom() {
        let query = "SELECT * FROM FlagGuessingQuestion mq JOIN question q where mq.id=q.id ORDER BY RAND() LIMIT 1";
        return new Promise((resolve, reject) => {
            db_1.default.query(query, (err, res) => {
                if (err) {
                    console.log("error in finding random question");
                    reject(err);
                }
                else {
                    console.log(res);
                    resolve(res === null || res === void 0 ? void 0 : res[0]);
                }
            });
        });
    }
    save(question) {
        return new Promise((resolve, reject) => {
            db_1.default.query("INSERT INTO Question (id, questionText, correctAnswer, timeLimit, points) VALUES(?,?,?,?,?)", [question.id, question.questionText, question.correctAnswer, question.timeLimit, question.points], (err, res) => {
                if (err) {
                    console.log("error in creating base question");
                    reject(err);
                }
                else {
                    const generatedId = question.id != undefined ? question.id : "";
                    db_1.default.query("INSERT INTO FlagGuessingQuestion (id,flagPath) VALUES (?,?)", [question.id, question.flagPath], (err, res) => {
                        if (err) {
                            console.log("error in creating county matching question");
                            console.log(err);
                            reject(err);
                        }
                        else
                            this.retrieveById(generatedId).then(question => { resolve(question); })
                                .catch(reject);
                    });
                }
            });
        });
    }
    update(question) {
        return Promise.resolve(0);
    }
    checkAnswer(answer) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const question = yield this.retrieveById(answer.questionId);
            if (!question) {
                throw new Error("Question not found");
            }
            const response = {
                correctAnswer: question.correctAnswer,
                point: ((_a = answer.answer) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === ((_b = question.correctAnswer) === null || _b === void 0 ? void 0 : _b.toLowerCase()) ? question.points : 0
            };
            return Promise.resolve(response);
        });
    }
}
exports.default = new FlagGuessingQuestionRepository();
