import { Request, Response, NextFunction } from "express";

import Question from '../models/question.model'

export class QuestionService {
    constructor() { }


     async createQuestion(req: Request, res: Response, next: NextFunction) {
        const { text, region } = req.body;

        try {
            if (!text || !region) {
                throw new Error('text or region is required to continue')
            }

            const newQuestion = await Question.create({ text, region })

            await newQuestion.save()

            if (!newQuestion) {
                return res.status(501).json({ message: `error adding new question` })
            }

            return res.status(201).json({ data: newQuestion })
        } catch (error) {
            console.error(error.message)
            next(error)
        }
    }


}