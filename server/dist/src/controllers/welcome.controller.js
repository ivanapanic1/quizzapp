"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.welcome = welcome;
exports.pictureTest = pictureTest;
exports.pictureTestReturn = pictureTestReturn;
const path_1 = __importDefault(require("path"));
const process_1 = __importDefault(require("process"));
const fs_1 = __importDefault(require("fs"));
function welcome(req, res) {
    if (req.session.user)
        return res.json({ message: `Welcome to ${req.session.user.username} application.` });
    return res.json({ message: "Welcome to bezkoder application." });
}
function pictureTest(req, res) {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded or invalid file type.' });
    }
    const filePath = path_1.default.join('/images', path_1.default.basename(req.file.path));
    return res.status(200).json({
        message: 'File uploaded successfully!',
        filePath: filePath,
    });
}
;
function pictureTestReturn(req, res) {
    if (!req.params.path) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Construct the absolute path to the uploaded file
    const filePath = path_1.default.join(process_1.default.cwd(), "/src/images/", req.params.path);
    console.log(filePath);
    // Check if the file exists
    fs_1.default.access(filePath, fs_1.default.constants.F_OK, (err) => {
        if (err) {
            res.status(404).send('Image not found');
            return; // Exit the function to prevent further code execution
        }
        // Send the file as a response
        res.sendFile(filePath, (err) => {
            if (err) {
                res.status(500).send('Error occurred while sending the image');
            }
        });
        console.log("file sent");
    });
}
