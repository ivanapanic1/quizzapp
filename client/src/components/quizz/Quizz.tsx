import React, { useState, useEffect } from 'react';
import {
    checkAnswerCallCountry, checkAnswerCallFlag,
    checkAnswerCallMath, checkAnswerCallWord,
    fetchCountryQuestion, fetchFlagGuessingQuestion,
    fetchMathQuestion,
    fetchWordQuestion
} from '../../API';
import {
    CountryFlagMatchingQuestion,
    FlagGuessingQuestion,
    MathQuestion,
    Question,
    WordGeneratorGame
} from "../../model/MathQuestion";
import {AnswerDto} from "../../model/AnswerDTO";
import QuestionCard from "../QuestionCard";
import {Simulate} from "react-dom/test-utils";
import {ServerAnswer} from "../../model/ServerAnswer";
import QuestionInput from "../inputQuestion/QuestionInput";

const TOTAL_QUESTIONS = 4;

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
    const [timer, setTimer] = useState<number>(30); // Example: 30 seconds
    const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
    const [timerRanOut, setTimerRanOut] = useState(false);
    const [clickState, setClickState] = useState(true);
    const [showResult, setShowResult] = useState(false);


    var currentQuestion = questions[number]; // Updated the current question assignment
    const isMathQuestion = (question: Question | MathQuestion): question is MathQuestion => {
        if(question===undefined) return false;
        return (question as MathQuestion).options !== undefined;

    };
    const isCountryFlagMatchingQuestion = (question: Question | CountryFlagMatchingQuestion): question is CountryFlagMatchingQuestion => {
        if(question===undefined) return false;
        return (question as CountryFlagMatchingQuestion).flagOptions !== undefined;

    };
    const isWordGeneratingQuestion = (question: Question | WordGeneratorGame): question is WordGeneratorGame => {
        if(question===undefined) return false;
        return (question as WordGeneratorGame).letters !== undefined;
    };
    const isFlagGuessingQuestion = (question: Question | FlagGuessingQuestion): question is FlagGuessingQuestion => {
        if(question===undefined) return false;
        return (question as FlagGuessingQuestion).flagPath !== undefined;
    };



    const answers =
        isMathQuestion(currentQuestion) ? currentQuestion.options :
            isCountryFlagMatchingQuestion(currentQuestion)? currentQuestion.flagOptions:
                isWordGeneratingQuestion(currentQuestion)? currentQuestion.letters:
            [];

    const answer =isFlagGuessingQuestion(currentQuestion)?currentQuestion.flagPath:undefined;
    const expression =isMathQuestion(currentQuestion)?currentQuestion.expression:"";

    const determineQuestionType = (question: Question): string => {
        switch (true) {
            case isMathQuestion(question):
                return 'MathQuestion';
            case isCountryFlagMatchingQuestion(question):
                return 'CountryFlagMatchingQuestion';
            case isWordGeneratingQuestion(question):
                return 'WordGeneratingQuestion';
            case isFlagGuessingQuestion(question):
                return 'FlagGuessingQuestion';
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
        const countryQuestion:CountryFlagMatchingQuestion = await fetchCountryQuestion();
        const wordQuestion:WordGeneratorGame=await fetchWordQuestion();
        const flagQuestion:FlagGuessingQuestion=await fetchFlagGuessingQuestion();
        const q: Question[] = [];

        q.push(newQuestion);
        q.push(countryQuestion);
        q.push(wordQuestion);
        q.push(flagQuestion);

        setQuestions(q);
        startTimer(q[0].timeLimit);
        setNumber(0)
        setClickState(determineQuestionType(q[0]) === 'WordGeneratingQuestion'?false:
            determineQuestionType(q[0]) !== 'FlagGuessingQuestion' );
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
                case 'CountryFlagMatchingQuestion':
                    serverAnswer = await checkAnswerCallCountry(newAnswer);
                    break;
                case 'WordGeneratingQuestion':
                    serverAnswer = await checkAnswerCallWord(newAnswer);
                    break;
                case 'FlagGuessingQuestion':
                    serverAnswer= await  checkAnswerCallFlag(newAnswer);
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
                    if(isLastQuestion())
                        setShowResult(true);

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
                    case 'CountryFlagMatchingQuestion':
                        serverAnswer = await checkAnswerCallCountry(newAnswer);
                        break;
                    case 'WordGeneratingQuestion':
                        serverAnswer = await checkAnswerCallWord(newAnswer);
                        break;
                    case 'FlagGuessingQuestion':
                        serverAnswer = await checkAnswerCallFlag(newAnswer);
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

                if(isLastQuestion())
                setShowResult(true)

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
                    case 'CountryFlagMatchingQuestion':
                        serverAnswer = await checkAnswerCallCountry({ questionId: questions[number].id, answer: 'xd' });
                        break;
                    case 'WordGeneratingQuestion':
                        serverAnswer = await checkAnswerCallWord({ questionId: questions[number].id, answer: 'xd' });
                        break;
                    case 'FlagGuessingQuestion':
                        serverAnswer = await checkAnswerCallFlag({ questionId: questions[number].id, answer: 'xd' });
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
            if(isLastQuestion())
                setShowResult(true);

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

    const isLastQuestion = ()=>{
          if(number === TOTAL_QUESTIONS - 1)
                  return true;
          else return false;
    }
    const restartGame=()=>{
        if(isLastQuestion()){
            setShowResult(false);
        }
        setGameOver(true);
    }
    const nextQuestion = () => {
        const nextQuestion = number + 1;
        if(nextQuestion===TOTAL_QUESTIONS){
            setGameOver(true);
        } else{
            setNumber(nextQuestion);
            setTimerRanOut(false);
            currentQuestion=questions[nextQuestion];
            setClickState(determineQuestionType(currentQuestion) === 'WordGeneratingQuestion'?false:
                determineQuestionType(currentQuestion) !== 'FlagGuessingQuestion' );
            startTimer(questions[nextQuestion].timeLimit);
        }
    };
    function test(s:string){console.log("hii");}

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
                        totalQuestions={TOTAL_QUESTIONS}
                        letters={answers}
                        // path={"1724604970120-austria.png"}
                        // images={true}
                        path={answer}
                        images={isFlagGuessingQuestion(currentQuestion)}
                    />
                </>
            )}
            {!loading && !gameOver && clickState && (
                <>
                    <p style={{ color: 'white' }}>Time left: {timer} seconds</p>
                    <QuestionCard
                        questionNr={number + 1}
                        totalQuestions={TOTAL_QUESTIONS}
                        question={questions[number].questionText}
                        expression={expression}
                        answers={answers!}
                        userAnswer={userAnswers ? userAnswers[number] : undefined}
                        callback={checkAnswer}
                        images={isCountryFlagMatchingQuestion(currentQuestion)}
                    />
                </>
            )}
            {!gameOver && !loading && userAnswers.length === number + 1 && !isLastQuestion() ? (
                <button className="next" onClick={nextQuestion}>
                    Next Question
                </button>
            ) : null}
            {showResult && (
                <>
                <button className="next" onClick={restartGame}>
                    Try Again
                </button>
                </>
            )}

            {timerRanOut && !isLastQuestion() ?(
                <button className="next" onClick={nextQuestion}>
                    Next Question
                </button>
            ) : null}
        </div>
    );
};

export default Quiz;