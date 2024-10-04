import React, { useState } from 'react';
import { Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { createMathQuestion } from '../../API'; // Adjust the import path as needed
import Center from '../LoginComponent/center';

interface FormValues {
    questionText: string;
    correctAnswer: string;
    timeLimit: number;
    points: number;
    expression: string;
    options: string[];
}

interface Errors {
    questionText?: string;
    correctAnswer?: string;
    timeLimit?: string;
    points?: string;
    expression?: string;
    options?: string[];
}

const getFreshModel = (): FormValues => ({
    questionText: '',
    correctAnswer: '',
    timeLimit: 0,
    points: 0,
    expression: '',
    options: ['', '', '', ''] // 4 options
});

const CreateMathQuestion: React.FC = () => {
    const [values, setValues] = useState<FormValues>(getFreshModel);
    const [errors, setErrors] = useState<Errors>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setValues(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...values.options];
        newOptions[index] = value;
        setValues(prev => ({
            ...prev,
            options: newOptions
        }));
    };

    const validate = (): boolean => {
        let temp: Errors = {};
        temp.questionText = values.questionText !== "" ? "" : "Question text is required";
        temp.correctAnswer = values.correctAnswer !== "" ? "" : "Correct answer is required";
        temp.timeLimit = values.timeLimit > 0 ? "" : "Time limit must be greater than 0";
        temp.points = values.points >= 0 ? "" : "Points cannot be negative";
        temp.expression = values.expression !== "" ? "" : "Expression is required";
        temp.options = values.options.length === 4 && values.options.every(option => option) ? [] : ["Exactly 4 options are required"];
        setErrors(temp);
        return Object.values(temp).every(x => x === "" || Array.isArray(x) && x.length === 0);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validate()) {
            try {
                await createMathQuestion({
                    questionText: values.questionText,
                    correctAnswer: values.correctAnswer,
                    timeLimit: values.timeLimit,
                    points: values.points,
                    expression: values.expression,
                    options: values.options
                });
                setValues(getFreshModel());
            } catch (error) {
                alert("Failed to create math question. Please try again.");
            }
        }
    };

    return (
        <Center>
            <Card sx={{ width: '400px' }} variant="outlined">
                <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="h3" sx={{ my: 3 }}>
                        Create New Math Question
                    </Typography>
                    <Box sx={{
                        '& .MuiTextField-root': {
                            margin: 1,
                            width: '90%'
                        }
                    }}>
                        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                            <TextField
                                label="Question Text"
                                name="questionText"
                                value={values.questionText}
                                onChange={handleInputChange}
                                variant="outlined"
                                margin="normal"
                                error={!!errors.questionText}
                                helperText={errors.questionText}
                            />
                            <TextField
                                label="Correct Answer"
                                name="correctAnswer"
                                value={values.correctAnswer}
                                onChange={handleInputChange}
                                variant="outlined"
                                margin="normal"
                                error={!!errors.correctAnswer}
                                helperText={errors.correctAnswer}
                            />
                            <TextField
                                label="Time Limit (seconds)"
                                name="timeLimit"
                                type="number"
                                value={values.timeLimit}
                                onChange={handleInputChange}
                                variant="outlined"
                                margin="normal"
                                error={!!errors.timeLimit}
                                helperText={errors.timeLimit}
                            />
                            <TextField
                                label="Points"
                                name="points"
                                type="number"
                                value={values.points}
                                onChange={handleInputChange}
                                variant="outlined"
                                margin="normal"
                                error={!!errors.points}
                                helperText={errors.points}
                            />
                            <TextField
                                label="Expression"
                                name="expression"
                                value={values.expression}
                                onChange={handleInputChange}
                                variant="outlined"
                                margin="normal"
                                error={!!errors.expression}
                                helperText={errors.expression}
                            />
                            {values.options.map((option, index) => (
                                <TextField
                                    key={index}
                                    label={`Option ${index + 1}`}
                                    value={option}
                                    onChange={(e) => handleOptionChange(index, e.target.value)}
                                    variant="outlined"
                                    margin="normal"
                                    error={!!errors.options && errors.options.length > 0}
                                    helperText={errors.options && errors.options.length > 0 ? "Exactly 4 options are required" : ""}
                                />
                            ))}
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                sx={{ width: '90%' }}
                            >
                                Create Question
                            </Button>
                        </form>
                    </Box>
                </CardContent>
            </Card>
        </Center>
    );
};

export default CreateMathQuestion;
