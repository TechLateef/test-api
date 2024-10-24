import { Request, Response, NextFunction } from "express";
import { calculateCurrentCycle } from "./cycle.service";
import AssignmentModel from "../models/assignment.model";
import Question from '../models/question.model';

export class AssignmentService {
    constructor() { }

    // Correctly fetch and parse the environment variables
    private START_DATE: Date = new Date(process.env.START_DATE!);
    private CYCLE_DURATION_DAYS: number = parseInt(process.env.CYCLE_DURATION_DAYS!);

    // Calculate the current cycle
    private currentCycle = calculateCurrentCycle(this.START_DATE, this.CYCLE_DURATION_DAYS);

    // Fetch assignment for a region and cycle
    async fetchRegionAssignment(req: Request, res: Response, next: NextFunction) {
        const { region } = req.params;

        try {
            const assignment = await AssignmentModel.findOne({ region, cycle: this.currentCycle }).populate('questionId');

            if (!assignment) {
                return res.status(404).json({ message: 'No question assigned for this cycle' });
            }

            return res.status(200).json(assignment);  // Use status 200 for successful retrieval
        } catch (error) {
            console.error(error.message);
            next(error);
        }
    }

    // Create assignment for a region and cycle
    async createAssignment(region: string) {
        try {
            // Check if an assignment already exists for the region and current cycle
            let assignment = await AssignmentModel.findOne({ region, cycle: this.currentCycle });

            if (assignment) {
                return assignment;
            }

            // Fetch all questions for the region
            const questions = await Question.find({ region });
            if (questions.length === 0) {
                throw new Error(`No questions available for region: ${region}`);
            }

            // Select a random question
            const randomIndex = Math.floor(Math.random() * questions.length);
            const selectedQuestion = questions[randomIndex];

            // Create the assignment
            assignment = await AssignmentModel.create({
                questionId: selectedQuestion._id,
                region,
                cycle: this.currentCycle,
                assignedAt: new Date(),
            });

            // No need to call save() after create()
            return await assignment.populate('questionId');
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }
}
