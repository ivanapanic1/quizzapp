import React, {useEffect, useState} from 'react';
import {CollumnWrapper, InputWrapper, LettersWrapper} from './InputWrapper.styles';
import {AnswerObject} from "../quizz/Quizz";
import ImageDisplay from "../display/ImageDisplay";
import {Simulate} from "react-dom/test-utils";
import reset = Simulate.reset;
import {Wrapper} from "../QuestionCard.styles";

type Props = {
    question: string;
    userAnswer: AnswerObject | undefined;
    onSubmit: (answer: string) => void;
    questionNr:number;
    images:boolean,
    totalQuestions:number;
    letters:string[]
    path:string| undefined,
};

const InputCard: React.FC<Props> = ({
                                        question,
                                        userAnswer,
                                        onSubmit,
                                        questionNr,
                                        images,
                                        totalQuestions,
                                        letters,
                                        path
                                    }) => {
    const [inputValue, setInputValue] = useState('');
    const [valid,setValidValue]= useState(true);

    // Reset inputValue when question, letters, or images change
    useEffect(() => {
        setInputValue('');
    }, [question]);

    const handleSubmit = () => {
        if(inputValue===''){alert("This field can't be empty")};
        onSubmit(inputValue);
    };
   
    const checkInputValidity = (input: string) => {
        if(images) return true;
      return valid;
    };

    return (
        <Wrapper>

        <div><CollumnWrapper>
            <p className="number">
            Question : {questionNr}/ {totalQuestions}
            </p>

            <p dangerouslySetInnerHTML={{ __html: question }}></p>
            {!images && (
                <LettersWrapper>
                {letters.map((letter, index) => (
                    <span key={index}>{letter}</span>
                ))}
            </LettersWrapper>)}
        </CollumnWrapper>
            <InputWrapper
                $correct={userAnswer?.correct}
                $userClicked={!!userAnswer}
            >
                 {images && (
                    <ImageDisplay filePath={path!}></ImageDisplay>)}
                 <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => {setInputValue(e.target.value);}}
                    disabled={!!userAnswer}
                    />
                <button onClick={handleSubmit} disabled={!!userAnswer||!valid}>
                    Submit
                </button>
            </InputWrapper>
        </div>
        </Wrapper>
    );
};

export default InputCard;
