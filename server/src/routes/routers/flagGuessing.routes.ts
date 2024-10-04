import {Router} from "express";
import {upload} from "../../config/fileUpload";
import flagGuessingQuestionController from "../../controllers/flagGuessingController";

class FlagGuessingRoutes{
    router=Router();
    controller= new flagGuessingQuestionController();
    constructor() {
        this.iniatizeRoutes();
    }
    iniatizeRoutes() {
        this.router.post("/",upload.single('file'),this.controller.create);
        this.router.get("/random",this.controller.getRandom);
        this.router.post("/check",this.controller.checkAnswer);
    }
}

export default new FlagGuessingRoutes().router;