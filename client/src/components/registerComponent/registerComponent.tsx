import React from 'react';
import {Box, Button, Card, CardContent, TextField, Typography} from "@mui/material";
import { Link } from '@mui/material'; // Add this import statement


import useForm from "../hook/useForm";
import {RegisterCall, RegisterDTO} from "../../API";
import Center from '../LoginComponent/center';

interface FormValues {
    username: string;
    email: string;
    password: string;
}

const getFreshModel = (): FormValues => ({
    username: '',
    email: '',
    password: ''
});

interface RegisterProps {
    onRegister: () => void;
    toggleForm: () => void; // Added
}

const Register: React.FC<RegisterProps> = ({ onRegister,toggleForm }) => {
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(getFreshModel);

    const register = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validate()) {
            try {
                const registerDTO: RegisterDTO = {
                    username: values.username,
                    email: values.email,
                    password: values.password
                };
                await RegisterCall(registerDTO);
                onRegister();
            } catch (error) {
                alert("Registration failed. Please try again.");
            }
        }
    };

    const validate = (): boolean => {
        let temp: Partial<FormValues> = {};
        temp.username = values.username !== "" ? "" : "This field is required";
        temp.email = (/^\S+@\S+\.\S+$/).test(values.email) ? "" : "Email is not valid";
        temp.password = values.password !== "" ? "" : "This field is required";
        setErrors(temp);
        return Object.values(temp).every(x => x === "");
    };

    return (
        <Center>
            <Card sx={{ width: '400px' }} variant="outlined">
                <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="h3" sx={{ my: 3 }}>
                        Register
                    </Typography>
                    <Box sx={{
                        '& .MuiTextField-root': {
                            margin: 1,
                            width: '90%'
                        }
                    }}>
                        <form noValidate autoComplete="off" onSubmit={register}>
                            <TextField
                                label="Username"
                                name="username"
                                value={values.username}
                                onChange={handleInputChange}
                                variant="outlined"
                                {...(errors.username && { error: true, helperText: errors.username })} />

                            <TextField
                                label="Email"
                                name="email"
                                value={values.email}
                                onChange={handleInputChange}
                                variant="outlined"
                                {...(errors.email && { error: true, helperText: errors.email })} />

                            <TextField
                                label="Password"
                                name="password"
                                type="password"
                                value={values.password}
                                onChange={handleInputChange}
                                variant="outlined"
                                {...(errors.password && { error: true, helperText: errors.password })} />
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                sx={{ width: '90%' }}>
                                Register
                            </Button>
                        </form>
                        <Typography sx={{ marginTop: 2 }}>
                            Already have an account?{" "}
                            <Link onClick={toggleForm} sx={{ cursor: 'pointer' }}>
                                Login here
                            </Link>
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Center>
    );
};

export default Register;