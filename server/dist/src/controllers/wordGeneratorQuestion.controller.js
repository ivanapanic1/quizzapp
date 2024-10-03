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
const questionDTO_1 = require("../models/questionDTO");
const WordGeneratorQuestionRepository_1 = __importDefault(require("../repository/WordGeneratorQuestionRepository"));
const crypto_1 = require("crypto");
class wordGeneratorQuestionController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.body) {
                res.status(400).send({
                    message: "Content can not be empty!"
                });
                return;
            }
            try {
                req.body.id = (0, crypto_1.randomUUID)().toString();
                const question = req.body;
                const savedQuestion = yield WordGeneratorQuestionRepository_1.default.save(question);
                res.status(201).send(savedQuestion);
            }
            catch (err) {
                res.status(500).json({
                    message: "Internal Server Error!"
                });
            }
        });
    }
    getRandom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const question = yield WordGeneratorQuestionRepository_1.default.retrieveRandom();
                res.status(200).send((0, questionDTO_1.wordGeneratorConvertToDTO)(question));
            }
            catch (err) {
                res.status(500).json({
                    message: "Internal Server Error!"
                });
            }
        });
    }
    checkAnswer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.body.answer || !req.body.questionId) {
                console.log(req.body);
                res.status(400).send({
                    message: "Content can not be empty!"
                });
                return;
            }
            try {
                const answer = req.body;
                const serverAnswer = yield WordGeneratorQuestionRepository_1.default.checkAnswer(answer);
                res.status(200).send(serverAnswer);
            }
            catch (err) {
                res.status(500).json({
                    message: "Internal Server Error!"
                });
            }
        });
    }
}
exports.default = wordGeneratorQuestionController;
