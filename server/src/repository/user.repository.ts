import connection from "../db";
import {OkPacket} from "mysql2";
import {LoginDTO} from "../models/LoginDTO";
import User from "../entity/user/user.model";


interface IUserRepository {
    save(user: User): Promise<User>;
    login(user:LoginDTO):Promise<User|undefined>;
    retrieveAll(searchParams: {email: string, password: string}): Promise<User[]>;
    retrieveById(userId: number): Promise<User | undefined>;
    update(user: User): Promise<number>;
    delete(userId: number): Promise<number>;
    deleteAll(): Promise<number>;
}

class UserRepository implements IUserRepository {
    delete(userId: number): Promise<number> {
        return new Promise((resolve,reject)=>{
            connection.query<OkPacket>(
                "DELETE FROM users WHERE id = ?",
                [userId],
                (err,res)=>{
                    if(err) reject(err);
                    else resolve(res.affectedRows);
                });
        });
    }

    deleteAll(): Promise<number> {
        return new Promise((resolve,reject)=>{
            connection.query<OkPacket>("DELETE FROM users",
            (err,res)=>{
                if(err) reject(err);
                else resolve(res.affectedRows);
            });
    });
    }

    retrieveAll(searchParams: { email?: string; password?: string }): Promise<User[]> {
        let query: string="Select * from users";
        let condition: string = "";
        if (searchParams?.email)
            condition += `email='${searchParams.email}'`;
        if (searchParams?.password)
            condition += `password='${searchParams.password}'`;
        if (condition.length)
            query+= " WHERE " + condition;

        return new Promise((resolve,reject)=>{
            connection.query<User[]>(query,(err,res)=>{
                if(err) reject(err);
                else resolve(res);
            });
        });

    }
    login(user: LoginDTO): Promise<User | undefined> {
        let query: string="Select * from users where email=? and password=?";
        return new Promise((resolve,reject)=>{
            connection.query<User[]>(query,[user.email,user.password],(err,res)=>{
                if(err) reject(err);
                else resolve(res?.[0]);
            })
        })
    }

    retrieveById(userId: number): Promise<User | undefined> {
        let query: string="Select * from users where id=?";
        return new Promise((resolve,reject)=>{
            connection.query<User[]>(query,userId,(err,res)=>{
                if(err) reject(err);
                else resolve(res?.[0]);
            });
        });
    }

    save(user: User): Promise<User> {
        return new Promise((resolve, reject) => {
            connection.query<OkPacket>(
                "INSERT INTO users (email,password,username) VALUES(?,?,?)",
                [ user.email, user.password,user.username],
                (err, res) => {
                    if (err) reject(err);
                    else
                        this.retrieveById(res.insertId)
                            .then((user) => resolve(user!))
                            .catch(reject);
                }
            );
        });    }

    update(user: User): Promise<number> {
        return new Promise((resolve,reject)=>{
            connection.query<OkPacket>(
                "UPDATE users SET email = ?, password = ? WHERE id = ?",
                [user.email,user.password,user.id],
                (err,res)=>{
                if(err) reject(err);
                else resolve(res.affectedRows);
            });
        });
    }
}

export default new UserRepository();