"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const assignment_service_1 = require("./services/assignment.service");
const assignment_controller_1 = require("./controllers/assignment.controller");
const app = express();
// Initialize the services and controllers
const assignmentService = new assignment_service_1.AssignmentService();
const assignmentController = new assignment_controller_1.AssignmentController(assignmentService); // This will automatically initialize the cron job
// Use JSON middleware
app.use(express.json());
// Start your server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map