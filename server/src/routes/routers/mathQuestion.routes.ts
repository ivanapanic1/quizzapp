import {Router} from "express";
import MathQuestionController from "../../controllers/mathQuestion.controller";

class MathQuestionRoutes{
    router=Router();
    controller= new MathQuestionController();
    constructor() {
        this.iniatizeRoutes();
    }
    iniatizeRoutes() {
        this.router.post("/",this.controller.create);
        this.router.get("/random",this.controller.getRandom);
        this.router.post("/check",this.controller.checkAnswer);
    }
}

export default new MathQuestionRoutes().router;