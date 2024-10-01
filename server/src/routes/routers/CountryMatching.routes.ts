import {Router} from "express";
import MathQuestionController from "../../controllers/mathQuestion.controller";
import countryFlagMatchingQuestionController from "../../controllers/CountryFlagMatchingQuestion.controller";
import {upload} from "../../config/fileUpload";

class CountryMatchingRoutes{
    router=Router();
    controller= new countryFlagMatchingQuestionController();
    constructor() {
        this.iniatizeRoutes();
    }
    iniatizeRoutes() {
        this.router.post("/",upload.array('files',4),this.controller.create);
        this.router.get("/random",this.controller.getRandom);
        this.router.post("/check",this.controller.checkAnswer);
    }
}

export default new CountryMatchingRoutes().router;