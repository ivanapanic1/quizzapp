import {Request,Response} from "express"
import userRepository from "../repository/user.repository";
import session from "express-session";
import {LoginDTO} from "../models/LoginDTO";
import User from "../entity/user/user.model";




export default class UserController{
    async logOut(req:Request,res:Response){
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: 'Failed to log out' });
            }
            res.clearCookie('connect.sid');

            return res.status(200).json({ message: 'Logged out' });
        });
    }
    async create(req:Request,res:Response){
        if (!req.body.email) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        }

        try{
            const user:User= req.body;
            const existingUser:User[]= await userRepository.retrieveAll({email:user.email})
            if(existingUser.length>0) {
                res.status(500).send("User with that email already exists");
                return;
            }
            const savedUser=await userRepository.save(user);
            res.status(201).send(savedUser);

        }catch (err){
            res.status(500).json({
                message:"Internal Server Error!"
            })
        }
    }
    async logIn(req:Request,res:Response){
        try{
            const user:LoginDTO= req.body;
            const loggedUser= await userRepository.login(user)
            if(loggedUser) {
                console.log("Logged in")
                req.session.user = {'username':loggedUser.username};
                res.status(200).send(loggedUser);
            }
            else
            {
                console.log("Not the right credentials")
                res.status(401).json("Your credentials weren't good");
            }
        }catch (err){
            console.log("error")
            res.status(500).json({
                message:"Internal Server Error!"
            })
        }
    }

    async findAll(req:Request,res:Response){
        const email = typeof req.query.email === "string" ? req.query.email : "";
        const password = typeof req.query.password === "string" ? req.query.password : "";
        try{
            const users:User[]=await userRepository.retrieveAll({email:email,password:password});


            res.status(200).send(users);

        }catch (err){
            res.status(500).json({
                message:"Internal Server Error!"
            })
        }
    }
    async findOne(req:Request,res:Response){
        try{
            res.status(200).json({
                message:"findOne OK",
                reqParamId: req.params.id
            });

        }catch (err){
            res.status(500).json({
                message:"Internal Server Error!"
            })
        }
    }
    async update(req:Request,res:Response){
        try{
            res.status(200).json({
                message:"update OK",
                reqParamId: req.params.id,
                reqBody:req.body
            });

        }catch (err){
            res.status(500).json({
                message:"Internal Server Error!"
            })
        }
    }
    async delete(req:Request,res:Response){
        try{
            res.status(200).json({
                message:"delete OK",
                reqParamId: req.params.id,
            });

        }catch (err){
            res.status(500).json({
                message:"Internal Server Error!"
            })
        }
    }
    async deleteAll(req:Request,res:Response){
    }
    async findAllEmail(req:Request,res:Response){
    }
}