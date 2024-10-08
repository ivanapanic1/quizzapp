import {shuffleArray} from "./utils";
import {
    CountryFlagMatchingQuestion,
    FlagGuessingQuestion,
    MathQuestion,
    Question,
    WordGeneratorGame
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

export async function fetchCountryQuestion():Promise<CountryFlagMatchingQuestion>{
    try {
        const response  = await fetch(`http://localhost:8080/api/country/random`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const question:CountryFlagMatchingQuestion=await response.json();
        return Promise.resolve(question);
    }
    catch (error) {
        throw (error)
    }
}

export async function fetchWordQuestion():Promise<WordGeneratorGame>{
    try {
        const response  = await fetch(`http://localhost:8080/api/word/random`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const question:WordGeneratorGame=await response.json();
        return Promise.resolve(question);
    }
    catch (error) {
        throw (error)
    }
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
export async function fetchFlagGuessingQuestion():Promise<FlagGuessingQuestion>{
    try {
        const response  = await fetch(`http://localhost:8080/api/flag/random`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const question:FlagGuessingQuestion=await response.json()
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
export async function checkAnswerCallCountry(answer:AnswerDto):Promise<ServerAnswer>{
    try {
        const response  = await fetch(`http://localhost:8080/api/country/check`, {
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

export async function checkAnswerCallWord(answer:AnswerDto):Promise<ServerAnswer>{
    try {
        const response  = await fetch(`http://localhost:8080/api/word/check`, {
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
export async function checkAnswerCallFlag(answer:AnswerDto):Promise<ServerAnswer>{
    try {
        const response  = await fetch(`http://localhost:8080/api/flag/check`, {
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

export async function createMathQuestion(question:MathQuestion): Promise<any>{
    const response  = await fetch(`http://localhost:8080/api/math/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(question)
    });
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    else{
    const data = await response.json();
    alert("Logged added new Math Question");
    }
}

export async function createFlagMatchingQuestion(files:File[],question:CountryFlagMatchingQuestion): Promise<any>{
    const formData = new FormData();
    files.forEach(file=> formData.append('files', file))
    formData.append('metadata',JSON.stringify(question))


    const response  = await fetch(`http://localhost:8080/api/country/`, {
            method: 'POST',
            body:formData
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        else{
        const data = await response.json();
        alert("Added new Word Generator Question");
        }
}

export async function createWordGeneratorQuestion(question:WordGeneratorGame): Promise<any>{
    const response  = await fetch(`http://localhost:8080/api/word/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(question)
    });
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    else{
    const data = await response.json();
    alert("Added new Word Generator Question");
    }
}
export async function createFlagGuessingQuestion(file:File,question:FlagGuessingQuestion): Promise<any>{
const formData = new FormData();
formData.append('file', file);
formData.append('metadata',JSON.stringify(question))


const response  = await fetch(`http://localhost:8080/api/flag/`, {
        method: 'POST',
        body:formData
    });
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    else{
    const data = await response.json();
    alert("Added new Word Generator Question");
    }
}
