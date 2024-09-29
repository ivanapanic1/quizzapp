import {shuffleArray} from "./utils";
import {
    MathQuestion,
    Question
} from "./model/MathQuestion";
import {AnswerDto} from "./model/AnswerDTO";
import {ServerAnswer} from "./model/ServerAnswer";

export class LoginDTO{
    email?:string;
    password?: string;
}
export class RegisterDTO{
    username?:string;
    email?:string;
    password?: string;
}


export async function fetchMathQuestion():Promise<MathQuestion>{
    try {
        const response  = await fetch(`http://localhost:8080/api/math/random`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const question:MathQuestion=await response.json()
        return Promise.resolve(question);
    }
    catch (error) {
        throw (error)
    }
}


export async function checkAnswerCallMath(answer:AnswerDto):Promise<ServerAnswer>{
    try {
        const response  = await fetch(`http://localhost:8080/api/math/check`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(answer)
        });
        const serverAnswer:ServerAnswer=await response.json()
        return Promise.resolve(serverAnswer);
    }
    catch (error) {
        throw (error)
    }
}


export async function loginCall(user:LoginDTO): Promise<any>{
        const response  = await fetch(`http://localhost:8080/api/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        else{
        const data = await response.json();
        console.log(data);
        sessionStorage.setItem('user', JSON.stringify(data));
        alert("Logged in successfully");
        }
}
export async function RegisterCall(user:RegisterDTO): Promise<any>{
        const response  = await fetch(`http://localhost:8080/api/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        else{
        const data = await response.json();
        console.log(data);
        sessionStorage.setItem('user', JSON.stringify(data));
        alert("Logged in successfully");
        }
}




