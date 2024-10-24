import { Router } from "express";
import { QuestionService } from "../services/question.service";
import { QuestionController } from "../controllers/question.controller";



export const questionRoute = Router()

const questionService = new QuestionService()
const questionController = new QuestionController(questionService)

questionRoute.post('/', (req, res, next) => { questionController.addAssignment })