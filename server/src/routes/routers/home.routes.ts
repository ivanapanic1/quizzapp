import {Router} from "express";
import UserController from "../../controllers/user.controller";
import {pictureTest, pictureTestReturn, welcome} from "../../controllers/welcome.controller";
import {upload} from "../../config/fileUpload";
// import {upload} from "../../server";


class HomeRoutes{
    router= Router();

    constructor() {
        this.iniatizeRoutes();
    }
    iniatizeRoutes(){
        this.router.get("/", welcome);
        this.router.post("/pictrue",upload.single('file'),pictureTest)
        this.router.get("/pictrue/:path",pictureTestReturn)
    }
}

export default new HomeRoutes().router;