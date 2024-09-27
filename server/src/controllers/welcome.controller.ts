import { Request, Response } from "express";
import path from "path";
import process from "process";
import fs from "fs";

export function welcome(req: Request, res: Response): Response {
    if(req.session.user)
        return res.json({ message: `Welcome to ${req.session.user.username} application.` });
    return res.json({ message: "Welcome to bezkoder application." });
}

export function pictureTest(req: Request, res: Response): Response{
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded or invalid file type.' });
    }
    const filePath = path.join('/images', path.basename(req.file.path));

    return res.status(200).json({
        message: 'File uploaded successfully!',
        filePath: filePath,
    });
};

export function pictureTestReturn(req: Request, res: Response): void{
    if (!req.params.path) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Construct the absolute path to the uploaded file
    const filePath = path.join(process.cwd(),"/src/images/",req.params.path);
    console.log(filePath)

    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
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