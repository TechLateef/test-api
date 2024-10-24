"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AssignmentSchema = new mongoose_1.Schema({
    questionId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Question",
        required: [true, "QuestionId is Required"]
    },
    region: {
        type: String,
        required: [true, 'Region is required']
    },
    cycle: {
        type: Number,
        required: [true, 'Cycle is required']
    },
    assignedAt: {
        type: Date,
        default: Date.now()
    }
});
exports.default = (0, mongoose_1.model)("Assignment", AssignmentSchema);
//# sourceMappingURL=assignment.model.js.map