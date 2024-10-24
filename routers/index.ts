

import { Request, Response } from "express";
import { questionRoute } from "./question.route";
import { assigmentRouter } from "./assigment.route";


const routeRegister = (app: any) => {
    app.get("/", (req: Request, res: Response) => {
        res.send("Application is up and Running");
    });
    app.use("/api/v1/question", questionRoute);
    app.use('/api/v1/assignment', assigmentRouter)

};

export default routeRegister;