import {Router} from "express";
import wordGeneratorQuestionController from "../../controllers/wordGeneratorQuestion.controller";

class WordRoutes{
    router=Router();
    controller= new wordGeneratorQuestionController();
    constructor() {
        this.iniatizeRoutes();
    }
    iniatizeRoutes() {
        this.router.post("/",this.controller.create);
        this.router.get("/random",this.controller.getRandom);
        this.router.post("/check",this.controller.checkAnswer);
    }
}

export default new WordRoutes().router;