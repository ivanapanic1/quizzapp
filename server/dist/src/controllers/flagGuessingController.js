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
const FlagGuessingQuestion_repository_1 = __importDefault(require("../repository/FlagGuessingQuestion.repository"));
const crypto_1 = require("crypto");
class flagGuessingQuestionController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            if (!req.file) {
                return res.status(400).json({ message: 'No file uploaded or invalid file type.' });
            }
            const filePath = req.file.filename;
            const metadata = req.body.metadata ? JSON.parse(req.body.metadata) : {};
            if (!metadata) {
                return res.status(400).json({ message: 'No metadata provided' });
            }
            try {
                const question = metadata;
                question.id = (0, crypto_1.randomUUID)().toString();
                question.flagPath = filePath;
                console.log(question);
                const savedQuestion = yield FlagGuessingQuestion_repository_1.default.save(question);
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
                const question = yield FlagGuessingQuestion_repository_1.default.retrieveRandom();
                res.status(200).send((0, questionDTO_1.flagGuessingConvertToDTO)(question));
            }
            catch (err) {
                console.log(err);
                res.status(500).json({
                    message: "Internal Server Error!"
                });
            }
        });
    }
    checkAnswer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.body.answer || !req.body.questionId) {
                res.status(400).send({
                    message: "Content can not be empty!"
                });
                return;
            }
            try {
                const answer = req.body;
                const serverAnswer = yield FlagGuessingQuestion_repository_1.default.checkAnswer(answer);
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
exports.default = flagGuessingQuestionController;
