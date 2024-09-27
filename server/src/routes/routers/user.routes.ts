import {Router} from "express";
import UserController from "../../controllers/user.controller";
import {welcome} from "../../controllers/welcome.controller";

class UserRoutes{
    router= Router();
    controller= new UserController();

    constructor() {
        this.iniatizeRoutes();
    }
    iniatizeRoutes(){

        this.router.post("/register",this.controller.create);
        this.router.post("/login",this.controller.logIn);
        this.router.get("/",this.controller.findAll);
        this.router.get("/logout",this.controller.logOut);
        this.router.get("/:id",this.controller.findOne);
        this.router.put("/:id",this.controller.update);
        this.router.delete("/:id",this.controller.delete);

    }
}

export default new UserRoutes().router;