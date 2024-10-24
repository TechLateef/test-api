
import { Request, Response, NextFunction } from "express";
import { QuestionService } from "../services/question.service";

export class QuestionController {

    constructor(private questionService: QuestionService) { }


    public async addAssignment(req: Request, res: Response, next: NextFunction) {
        try {
            const newQuestion = await this.questionService.createQuestion(req, res, next)

            return newQuestion
        } catch (error) {
            next(error)
        }
    }
}