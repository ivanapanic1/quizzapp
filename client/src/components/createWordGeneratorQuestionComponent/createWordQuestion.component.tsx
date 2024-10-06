import React, { useState } from 'react';
import { Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { createWordGeneratorQuestion } from '../../API';
import Center from "../LoginComponent/center"; // Adjust the import path as needed

interface FormValues {
    questionText: string;
    timeLimit: number;
    letters: string;
    dictionary: string;
}

interface Errors {
    questionText?: string;
    timeLimit?: string;
    letters?: string;
    dictionary?: string;
}

const getFreshModel = (): FormValues => ({
    questionText: '',
    timeLimit: 0,
    letters: '',
    dictionary: ''
});

const CreateWordGeneratorQuestion: React.FC = () => {
    const [values, setValues] = useState<FormValues>(getFreshModel);
    const [errors, setErrors] = useState<Errors>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setValues(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validate = (): boolean => {
        let temp: Errors = {};
        temp.questionText = values.questionText !== "" ? "" : "Question text is required";
        temp.timeLimit = values.timeLimit > 0 ? "" : "Time limit must be greater than 0";
        temp.letters = values.letters.split(',').length === 10 ? "" : "You must provide exactly 10 letters";
        temp.dictionary = values.dictionary.split(',').length === 10 ? "" : "You must provide exactly 10 dictionary words";
        setErrors(temp);
        return Object.values(temp).every(x => x === "");
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validate()) {
            try {
                await createWordGeneratorQuestion({
                    questionText: values.questionText,
                    points:0,
                    correctAnswer:"",
                    timeLimit: values.timeLimit,
                    letters: values.letters.split(','),
                    dictionary: values.dictionary.split(',')
                });
                setValues(getFreshModel());
            } catch (error) {
                alert("Failed to create word generator question. Please try again.");
            }
        }
    };

    return (
        <Center>
            <Card sx={{ width: '400px' }} variant="outlined">
                <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="h3" sx={{ my: 3 }}>
                        Create New Word Generator Question
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
                                label="Letters (comma-separated, 10 values)"
                                name="letters"
                                value={values.letters}
                                onChange={handleInputChange}
                                variant="outlined"
                                margin="normal"
                                error={!!errors.letters}
                                helperText={errors.letters}
                                multiline
                                rows={2}
                            />
                            <TextField
                                label="Dictionary (comma-separated, 10 words)"
                                name="dictionary"
                                value={values.dictionary}
                                onChange={handleInputChange}
                                variant="outlined"
                                margin="normal"
                                error={!!errors.dictionary}
                                helperText={errors.dictionary}
                                multiline
                                rows={2}
                            />
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

export default CreateWordGeneratorQuestion;