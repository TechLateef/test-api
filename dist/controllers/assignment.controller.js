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
exports.AssignmentController = void 0;
const cron = require("node-cron");
class AssignmentController {
    constructor(assignmentService) {
        this.assignmentService = assignmentService;
        // Initialize the cron job when the controller is created
        this.initializeCronJob();
    }
    // This method doesn't rely on req or res; used for cron
    createAssignmentForRegions() {
        return __awaiter(this, void 0, void 0, function* () {
            const regions = ['Nigeria', 'Singapore'];
            for (const region of regions) {
                try {
                    const assignment = yield this.assignmentService.createAssignment(region);
                    console.log(`Assignment for region ${region}:`, assignment);
                }
                catch (error) {
                    console.error(`Error creating assignment for region ${region}:`, error.message);
                }
            }
        });
    }
    // Initialize the cron job to run daily at midnight
    initializeCronJob() {
        cron.schedule('0 0 * * *', () => __awaiter(this, void 0, void 0, function* () {
            console.log("Running assignment cron job at midnight");
            yield this.createAssignmentForRegions();
            console.log('Assignment cron job completed');
        }));
    }
}
exports.AssignmentController = AssignmentController;
//# sourceMappingURL=assignment.controller.js.map