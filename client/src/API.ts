import {shuffleArray} from "./utils";

export class LoginDTO{
    email?:string;
    password?: string;
}
export class RegisterDTO{
    username?:string;
    email?:string;
    password?: string;
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




