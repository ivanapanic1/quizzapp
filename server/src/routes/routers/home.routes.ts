import {Router} from "express";
// import {upload} from "../../server";


class HomeRoutes{
    router= Router();

    constructor() {
        this.iniatizeRoutes();
    }
    iniatizeRoutes(){
        // this.router.get("/", welcome);
    }
}

export default new HomeRoutes().router;