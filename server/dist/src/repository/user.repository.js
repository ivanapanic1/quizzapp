"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
class UserRepository {
    delete(userId) {
        return new Promise((resolve, reject) => {
            db_1.default.query("DELETE FROM users WHERE id = ?", [userId], (err, res) => {
                if (err)
                    reject(err);
                else
                    resolve(res.affectedRows);
            });
        });
    }
    deleteAll() {
        return new Promise((resolve, reject) => {
            db_1.default.query("DELETE FROM users", (err, res) => {
                if (err)
                    reject(err);
                else
                    resolve(res.affectedRows);
            });
        });
    }
    retrieveAll(searchParams) {
        let query = "Select * from users";
        let condition = "";
        if (searchParams === null || searchParams === void 0 ? void 0 : searchParams.email)
            condition += `email='${searchParams.email}'`;
        if (searchParams === null || searchParams === void 0 ? void 0 : searchParams.password)
            condition += `password='${searchParams.password}'`;
        if (condition.length)
            query += " WHERE " + condition;
        return new Promise((resolve, reject) => {
            db_1.default.query(query, (err, res) => {
                if (err)
                    reject(err);
                else
                    resolve(res);
            });
        });
    }
    login(user) {
        let query = "Select * from users where email=? and password=?";
        return new Promise((resolve, reject) => {
            db_1.default.query(query, [user.email, user.password], (err, res) => {
                if (err)
                    reject(err);
                else
                    resolve(res === null || res === void 0 ? void 0 : res[0]);
            });
        });
    }
    retrieveById(userId) {
        let query = "Select * from users where id=?";
        return new Promise((resolve, reject) => {
            db_1.default.query(query, userId, (err, res) => {
                if (err)
                    reject(err);
                else
                    resolve(res === null || res === void 0 ? void 0 : res[0]);
            });
        });
    }
    save(user) {
        return new Promise((resolve, reject) => {
            db_1.default.query("INSERT INTO users (email,password,username) VALUES(?,?,?)", [user.email, user.password, user.username], (err, res) => {
                if (err)
                    reject(err);
                else
                    this.retrieveById(res.insertId)
                        .then((user) => resolve(user))
                        .catch(reject);
            });
        });
    }
    update(user) {
        return new Promise((resolve, reject) => {
            db_1.default.query("UPDATE users SET email = ?, password = ? WHERE id = ?", [user.email, user.password, user.id], (err, res) => {
                if (err)
                    reject(err);
                else
                    resolve(res.affectedRows);
            });
        });
    }
}
exports.default = new UserRepository();
