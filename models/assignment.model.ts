
import { Document, model, Schema } from "mongoose";

export interface IAssigment extends Document {
    questionId: string;
    region: string;
    cycle: number;
    assignedAt: Date;
}

const AssignmentSchema = new Schema({
    questionId: {
        type: Schema.Types.ObjectId,
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
})


export default model<IAssigment>("Assignment", AssignmentSchema)
