"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignmentService = void 0;
const cycle_service_1 = require("./cycle.service");
const assignment_model_1 = require("../models/assignment.model");
const question_model_1 = require("../models/question.model");
class AssignmentService {
    constructor() {
        // Correctly fetch and parse the environment variables
        this.START_DATE = new Date(process.env.START_DATE);
        this.CYCLE_DURATION_DAYS = parseInt(process.env.CYCLE_DURATION_DAYS);
        // Calculate the current cycle
        this.currentCycle = (0, cycle_service_1.calculateCurrentCycle)(this.START_DATE, this.CYCLE_DURATION_DAYS);
    }
    // Fetch assignment for a region and cycle
    fetchRegionAssignment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { region } = req.params;
            try {
                const assignment = yield assignment_model_1.default.findOne({ region, cycle: this.currentCycle }).populate('questionId');
                if (!assignment) {
                    return res.status(404).json({ message: 'No question assigned for this cycle' });
                }
                return res.status(200).json(assignment); // Use status 200 for successful retrieval
            }
            catch (error) {
                console.error(error.message);
                next(error);
            }
        });
    }
    // Create assignment for a region and cycle
    createAssignment(region) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Check if an assignment already exists for the region and current cycle
                let assignment = yield assignment_model_1.default.findOne({ region, cycle: this.currentCycle });
                if (assignment) {
                    return assignment;
                }
                // Fetch all questions for the region
                const questions = yield question_model_1.default.find({ region });
                if (questions.length === 0) {
                    throw new Error(`No questions available for region: ${region}`);
                }
                // Select a random question
                const randomIndex = Math.floor(Math.random() * questions.length);
                const selectedQuestion = questions[randomIndex];
                // Create the assignment
                assignment = yield assignment_model_1.default.create({
                    questionId: selectedQuestion._id,
                    region,
                    cycle: this.currentCycle,
                    assignedAt: new Date(),
                });
                // No need to call save() after create()
                return yield assignment.populate('questionId');
            }
            catch (error) {
                console.error(error.message);
                throw error;
            }
        });
    }
}
exports.AssignmentService = AssignmentService;
//# sourceMappingURL=assignment.service.js.map