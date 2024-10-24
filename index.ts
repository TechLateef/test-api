import * as  express from "express";
import { AssignmentService } from "./services/assignment.service";
import { AssignmentController } from "./controllers/assignment.controller";

const app = express();

// Initialize the services and controllers
const assignmentService = new AssignmentService();
const assignmentController = new AssignmentController(assignmentService); // This will automatically initialize the cron job

// Use JSON middleware
app.use(express.json());

// Start your server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
