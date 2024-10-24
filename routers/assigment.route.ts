
import { Router } from "express";
import { AssignmentService } from "../services/assignment.service";
import { AssignmentController } from "../controllers/assignment.controller";



export const  assigmentRouter = Router()

const assignmentService = new AssignmentService();
const assignmentController = new AssignmentController(assignmentService);

assigmentRouter.post('/', (req, res, next) => { assignmentController.createAssignmentForRegions() })