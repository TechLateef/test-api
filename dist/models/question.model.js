"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const QuestionSchema = new mongoose_1.Schema({
    text: {
        type: String,
        required: [true, 'Question Text is required']
    },
    region: {
        type: String,
        required: [true, "region is required"]
    }
});
exports.default = (0, mongoose_1.model)("Question", QuestionSchema);
//# sourceMappingURL=question.model.js.map