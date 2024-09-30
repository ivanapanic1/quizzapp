import React, { useState, useEffect } from 'react';
import {
    checkAnswerCallMath,
    fetchMathQuestion
} from '../../API';
import {
    MathQuestion,
    Question
} from "../../model/MathQuestion";
import {AnswerDto} from "../../model/AnswerDTO";
import QuestionCard from "../QuestionCard";
import {Simulate} from "react-dom/test-utils";
import {ServerAnswer} from "../../model/ServerAnswer";
import QuestionInput from "../inputQuestion/QuestionInput";


export type AnswerObject ={
    question:string;
    answer:string;
    correct:boolean;
    correctAnswer:string;
    timedOut:boolean;
}


interface QuizProps {
    startTrivia: () => void;
    score: number;
    setScore: React.Dispatch<React.SetStateAction<number>>;
}

const Quiz: React.FC<QuizProps> = ({ startTrivia, score, setScore }) => {
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [number, setNumber] = useState(0);
    const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
    const [gameOver, setGameOver] = useState(true);
    const [clickedAnswer, setClickedAnswer] = useState<string | null>(null);
    const [clickState, setClickState] = useState(true);
    const [timer, setTimer] = useState<number>(30); // Example: 30 seconds
    const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
    const [timerRanOut, setTimerRanOut] = useState(false);


    var currentQuestion = questions[number]; // Updated the current question assignment
    const isMathQuestion = (question: Question | MathQuestion): question is MathQuestion => {
        if(question===undefined) return false;
        return (question as MathQuestion).options !== undefined;

    };




    const answers =
        isMathQuestion(currentQuestion) ? currentQuestion.options :
            [];
    const expression =isMathQuestion(currentQuestion)?currentQuestion.expression:"";

    const determineQuestionType = (question: Question): string => {
        switch (true) {
            case isMathQuestion(question):
                return 'MathQuestion';
            default: return ""
        }
    };

    const startTimer = (timeLimit: number) => {
        setTimer(timeLimit);
        setIsTimerActive(true); // Start the timer
    };

    const stopTimer = () => {
        setIsTimerActive(false); // Stop the timer
    };

    const startQuiz = async () => {
        setLoading(true);
        setQuestions([])
        setUserAnswers([]);
        setScore(0);
        setClickedAnswer(null)


        const newQuestion = await fetchMathQuestion()
        const q: Question[] = [];

        q.push(newQuestion);
 
        setQuestions(q);
        startTimer(q[0].timeLimit);
        setNumber(0)
        setLoading(false);
        setGameOver(false);
    };

    const checkSubmit = async (answer:string)=> {
        stopTimer();

        const newAnswer: AnswerDto = {questionId: questions[number].id, answer: answer};

        try {
            var serverAnswer: ServerAnswer;
            switch (determineQuestionType(currentQuestion)) {
                case 'MathQuestion':
                    serverAnswer = await checkAnswerCallMath(newAnswer);
                    break;
            }
                    let correct = false;

                    if (serverAnswer!.correctAnswer && serverAnswer!.point !== 0) {
                        setScore((prev) => prev + serverAnswer.point);
                        correct = true;
                    }

                    const answerObject = {
                        question: questions[number].questionText,
                        answer,
                        correct,
                        correctAnswer: serverAnswer!.correctAnswer,
                        timedOut: false,
                    };
                    setUserAnswers((prev) => [...prev, answerObject]);

        }catch (error) {console.log(error);}

    }

    const checkAnswer = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!gameOver) {
            stopTimer();

            const answer = e.currentTarget.value;
            setClickedAnswer(answer);

            const newAnswer: AnswerDto = { questionId: questions[number].id, answer: answer };

            try {
                var serverAnswer:ServerAnswer;
                switch (determineQuestionType(currentQuestion)) {
                    case 'MathQuestion':
                        serverAnswer = await checkAnswerCallMath(newAnswer);
                        break;
                }
                let correct = false;

                if (serverAnswer!.correctAnswer && serverAnswer!.point !== 0) {
                    setScore((prev) => prev + serverAnswer.point);
                    correct = true;
                }

                const answerObject = {
                    question: questions[number].questionText,
                    answer,
                    correct,
                    correctAnswer: serverAnswer!.correctAnswer,
                    timedOut: false,
                };
                setUserAnswers((prev) => [...prev, answerObject]);

            } catch (error) {
                console.error('Error checking answer:', error);
            }
        }
    };

    const callApiOnTimeout = async () => {
        try {
                var serverAnswer:ServerAnswer;
                switch (determineQuestionType(currentQuestion)) {
                    case 'MathQuestion':
                        serverAnswer = await checkAnswerCallMath({ questionId: questions[number].id, answer: 'xd' });
                        break;
                    default:
                        console.error('Unknown question type');
                }
            const answerObject: AnswerObject = {
                question: questions[number].questionText,
                answer: 'xd',
                correct: false,
                correctAnswer: serverAnswer!.correctAnswer,
                timedOut: true,
            };
            setUserAnswers((prev) => [...prev, answerObject]);
            setTimerRanOut(true);

        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        let timerId: NodeJS.Timeout;

        if (isTimerActive) {
            timerId = setInterval(() => {
                setTimer((prev) => {
                    if (prev === 1) {
                        setIsTimerActive(false);
                        callApiOnTimeout();
                        clearInterval(timerId);
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => clearInterval(timerId);
    }, [isTimerActive]);



    
    return (
        <div>
            {gameOver ?(
                <button className="start" onClick={startQuiz}>
                    Start
                </button>
            ) : null}
            {!gameOver ? <p className="score">Score: {score}</p> : null}
            {loading && <p>Loading Questions ...</p>}
            {!loading && !gameOver && !clickState && (
                <>
                    <p style={{ color: 'white' }}>Time left: {timer} seconds</p>
                    <QuestionInput
                        question={questions[number].questionText}
                        userAnswer={userAnswers ? userAnswers[number] : undefined}
                        onSubmit={checkSubmit}
                        questionNr={number + 1}
                        images={true}                       
                    />
                </>
            )}
            {!loading && !gameOver && clickState && (
                <>
                    <p style={{ color: 'white' }}>Time left: {timer} seconds</p>
                    <QuestionCard
                        questionNr={number + 1}
                        question={questions[number].questionText}
                        expression={expression}
                        answers={answers!}
                        userAnswer={userAnswers ? userAnswers[number] : undefined}
                        callback={checkAnswer}
                        images={true}
                    />
                </>
            )}
        </div>
    );
};

export default Quiz;