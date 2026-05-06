import mongoose, { Document, Schema } from 'mongoose';

export interface IChatKnowledge extends Document {
  keywords: string[];
  question: string;
  answer: string;
  category: string;
  priority: number;
  createdAt: Date;
  updatedAt: Date;
}

const ChatKnowledgeSchema = new Schema<IChatKnowledge>(
  {
    keywords: [{ type: String, required: true }],
    question: { type: String, required: true },
    answer: { type: String, required: true },
    category: { type: String, default: 'general' },
    priority: { type: Number, default: 0 }
  },
  { timestamps: true }
);

ChatKnowledgeSchema.index({ keywords: 1 });
ChatKnowledgeSchema.index({ category: 1 });

export default mongoose.model<IChatKnowledge>('ChatKnowledge', ChatKnowledgeSchema);
