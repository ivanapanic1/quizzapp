import React from 'react'
import {Box, Button, Card, CardContent, Link, TextField, Typography} from "@mui/material";
import Center from "./center";
import useForm from "../hook/useForm";
import {loginCall} from "../../API";

interface FormValues {
    password: string;
    email: string;
}

const getFreshModel = (): FormValues => ({
    password: '',
    email: ''
});
interface LoginProps {
    onLogin: () => void;
    toggleForm: () => void; // Added
}
export default function Login({
                                  onLogin,
                                  toggleForm
                                }: LoginProps): JSX.Element {

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(getFreshModel);

    const login = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validate()) {
            try {
                await loginCall(values);
                onLogin();
            }catch (error) {
                alert("Your username or password were wrong please try again!");
                return;
            }
        }
    }


    const validate = (): boolean => {
        let temp: Partial<FormValues> = {};
        temp.email = (/^\S+@\S+\.\S+$/).test(values.email) ? "" : "Email is not valid";
        temp.password = values.password !== "" ? "" : "This field is required";
        setErrors(temp);
        return Object.values(temp).every(x => x === "");
    }

    return(
        <Center>
            <Card sx={{width:'400'}} variant="outlined">
                <CardContent sx={{textAlign:"center"}}>
                    <Typography variant="h3" sx={{my:3}}>
                        Quiz App</Typography>
                    <Box sx={{
                        '& .MuiTextField-root':{
                            margin:1,
                            width:'90%'

                        }
                    }}>
                        <form noValidate autoComplete="off" onSubmit={login}>
                            <TextField
                                label="Email"
                                name="email"
                                value={values.email}
                                onChange={handleInputChange}
                                variant="outlined"
                                {...(errors.email && {error:true, helperText:errors.email})}/>

                            <TextField
                                label="Password"
                                name="password"
                                type="password"
                                value={values.password}
                                onChange={handleInputChange}
                                variant="outlined"
                                {...(errors.password&& {error:true, helperText:errors.password})}/>
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                sx={{width:'90%'}}>
                                Start</Button>
                        </form>
                        <Typography sx={{ marginTop: 2 }}>
                            Dont have an account?{" "}
                            <Link onClick={toggleForm} sx={{ cursor: 'pointer' }}>
                                Register here
                            </Link>
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Center>
    )
}