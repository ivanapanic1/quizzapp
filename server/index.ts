import express, {Application} from 'express';
import {Express,Response,Request} from "express";
import cors,{CorsOptions} from "cors";
import Routes from "./src/routes";
import session from "express-session";
import multer from "multer";
import path from "path";


const app: Express = express()

export default class Server {
    constructor(app: Application) {
        this.config(app);
        new Routes(app);
    }

    private config(app: Application): void {
        const corsOptions: CorsOptions = {
            //react-app route
            origin: "http://localhost:3000",
            credentials:false// Allow credentials to be included in CORS requests
        };

        app.use(cors(corsOptions));
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        // Session middleware setup
        app.use(session({
            secret: 'your-secret-key', // Replace with a strong secret key
            resave: false,
            saveUninitialized: false,
            cookie: {
                secure: false, // Set to true in production with HTTPS
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24, // 1 day session expiration
            },
        }));


    }
}