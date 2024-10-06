import React, { useState } from 'react';
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { createFlagGuessingQuestion } from '../../API';
import Center from "../LoginComponent/center";
import ImageDisplay from "../upload/upload.component";
import useForm from "../hook/useForm";

interface FormValues {
    questionText: string;
    correctAnswer: string;
    timeLimit: number;
    points: number;
}

const getFreshModel = (): FormValues => ({
    questionText: '',
    correctAnswer: '',
    timeLimit: 0,
    points: 0
});

const CreateFlagGuessingQuestion: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [formError, setFormError] = useState<string | null>(null);
    const { values, setValues, errors, setErrors, handleInputChange } = useForm(getFreshModel);

    const validate = (): boolean => {
        let temp: Partial<{ [key in keyof FormValues]: string }> = {};
        temp.questionText = values.questionText ? "" : "This field is required";
        temp.correctAnswer = values.correctAnswer ? "" : "This field is required";
        temp.timeLimit = values.timeLimit > 0 ? "" : "Time limit must be greater than 0";
        temp.points = values.points > 0 ? "" : "Points must be greater than 0";
        setErrors(temp);
        return Object.values(temp).every(x => x === "");
    };

    const handleFileChange = (file: File | null) => {
        setSelectedFile(file);
        if (file) {
            setValues((prevValues) => ({
                ...prevValues,
                flagPath: file.name // Update flagPath
            }));
        } else {
            setValues((prevValues) => ({
                ...prevValues,
                flagPath: ''
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validate()) {
            if (!selectedFile) {
                setFormError('Please upload a flag image.');
                return;
            }
            try {
                await createFlagGuessingQuestion(selectedFile, {
                    questionText: values.questionText,
                    correctAnswer: values.correctAnswer,
                    timeLimit: values.timeLimit,
                    points: values.points,
                    flagPath: selectedFile.name // Include this as metadata
                });
                setValues(getFreshModel());
                setSelectedFile(null); // Clear the selected file after successful submission
            } catch (error) {
                alert('Failed to add the question.');
            }
        }
    };

    return (
        <Center>
            <Card sx={{ width: '400px' }} variant="outlined">
                <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" sx={{ my: 3 }}>
                        Create Flag Guessing Question
                    </Typography>
                    <Box sx={{ '& .MuiTextField-root': { margin: 1, width: '90%' } }}>
                        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                            <TextField
                                label="Question Text"
                                name="questionText"
                                value={values.questionText}
                                onChange={handleInputChange}
                                variant="outlined"
                                {...(errors.questionText && { error: true, helperText: errors.questionText })}
                            />
                            <TextField
                                label="Correct Answer"
                                name="correctAnswer"
                                value={values.correctAnswer}
                                onChange={handleInputChange}
                                variant="outlined"
                                {...(errors.correctAnswer && { error: true, helperText: errors.correctAnswer })}
                            />
                            <TextField
                                label="Time Limit"
                                name="timeLimit"
                                type="number"
                                value={values.timeLimit}
                                onChange={handleInputChange}
                                variant="outlined"
                                {...(errors.timeLimit && { error: true, helperText: errors.timeLimit })}
                            />
                            <TextField
                                label="Points"
                                name="points"
                                type="number"
                                value={values.points}
                                onChange={handleInputChange}
                                variant="outlined"
                                {...(errors.points && { error: true, helperText: errors.points })}
                            />
                            <ImageDisplay onFileSelect={handleFileChange} />
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                sx={{ width: '90%', mt: 2 }}
                            >
                                Submit
                            </Button>
                            {formError && <Typography color="error" sx={{ mt: 2 }}>{formError}</Typography>}
                        </form>
                    </Box>
                </CardContent>
            </Card>
        </Center>
    );
};

export default CreateFlagGuessingQuestion;