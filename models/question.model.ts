import { Document, model, Schema } from "mongoose"
export interface IQuestion extends Document {
    text: string,
    region: string
}

const QuestionSchema = new Schema({
    text: {
        type: String,
        required: [true, 'Question Text is required']
    },
    region: {
        type: String,
        required: [true, "region is required"]
    }
})

   

export default  model<IQuestion>("Question", QuestionSchema)