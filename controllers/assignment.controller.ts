import { AssignmentService } from "../services/assignment.service";
import * as cron from 'node-cron';

export class AssignmentController {
    constructor(private assignmentService: AssignmentService) {
        // Initialize the cron job when the controller is created
        this.initializeCronJob();
    }

    // This method doesn't rely on req or res; used for cron
    async createAssignmentForRegions() {
        const regions = ['Nigeria', 'Singapore'];

        for (const region of regions) {
            try {
                const assignment = await this.assignmentService.createAssignment(region);
                console.log(`Assignment for region ${region}:`, assignment);
            } catch (error) {
                console.error(`Error creating assignment for region ${region}:`, error.message);
            }
        }
    }

    // Initialize the cron job to run daily at midnight
    private initializeCronJob() {
        cron.schedule('0 0 * * *', async () => {
            console.log("Running assignment cron job at midnight");
            await this.createAssignmentForRegions();
            console.log('Assignment cron job completed');
        });
    }
}
