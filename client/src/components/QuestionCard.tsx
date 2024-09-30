import React from 'react';
import {Wrapper,ButtonWrapper} from "./QuestionCard.styles";
import {AnswerObject} from "./quizz/Quizz";
import ImageDisplay from "./display/ImageDisplay";
import {Question} from "../model/MathQuestion";

type Props ={
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>)=>void;
    userAnswer:AnswerObject | undefined;
    questionNr:number;
    images:boolean;
    expression:string;
    totalQuestions:number;
}

const QuestionCard: React.FC<Props> = ({
                                           question,
                                           answers,
                                           callback,
                                           userAnswer,
                                           questionNr,
                                           images,
                                           expression,
                                           totalQuestions
                                       }) => (

    <Wrapper>
        <p className="number">
            Question : {questionNr} / {totalQuestions}
        </p>

        <p>{question}</p>
        <p>{expression}</p>
        <div>
            {answers.map(answer=>(
                <ButtonWrapper
                    key={answer}
                    $correct={userAnswer?.correctAnswer === answer.toString()}
                    $userClicked={userAnswer?.answer === answer.toString()}
                    $timedout={userAnswer? userAnswer.timedOut:false}
                >
                    <button
                        disabled={userAnswer ? true : false}
                        value={answer}
                        onClick={callback}
                    >
                        {images && (
                        <ImageDisplay filePath={answer}></ImageDisplay>)}
                        {!images && (
                            <span dangerouslySetInnerHTML={{__html:answer}}></span>)
                        }
                    </button>
                </ButtonWrapper>
            ))}
        </div>

    </Wrapper>
);

export default QuestionCard;
