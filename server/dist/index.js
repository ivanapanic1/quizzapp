"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./src/routes"));
const express_session_1 = __importDefault(require("express-session"));
const app = (0, express_1.default)();
class Server {
    constructor(app) {
        this.config(app);
        new routes_1.default(app);
    }
    config(app) {
        const corsOptions = {
            //react-app route
            origin: "http://localhost:3000",
            credentials: false // Allow credentials to be included in CORS requests
        };
        app.use((0, cors_1.default)(corsOptions));
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ extended: true }));
        // Session middleware setup
        app.use((0, express_session_1.default)({
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
exports.default = Server;
