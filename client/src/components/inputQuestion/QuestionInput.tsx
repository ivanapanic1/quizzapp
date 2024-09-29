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
};

const InputCard: React.FC<Props> = ({
                                        question,
                                        userAnswer,
                                        onSubmit,
                                        questionNr,
                                        images,
                                    }) => {
    const [inputValue, setInputValue] = useState('');
    const [valid,setValidValue]= useState(true);

    const handleSubmit = () => {
        onSubmit(inputValue);
    };
   
    return (
        <Wrapper>

        <div><CollumnWrapper>
            <p className="number">
                Question : {questionNr}
            </p>

            <p dangerouslySetInnerHTML={{ __html: question }}></p>
        </CollumnWrapper>
            <InputWrapper
                $correct={userAnswer?.correct}
                $userClicked={!!userAnswer}
            >
                <button onClick={handleSubmit} disabled={!!userAnswer||!valid}>
                    Submit
                </button>
            </InputWrapper>
        </div>
        </Wrapper>
    );
};

export default InputCard;
