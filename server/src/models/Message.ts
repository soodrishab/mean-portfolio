import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  isReplied: boolean;
  ipAddress: string;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, default: 'Contact Form Submission' },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    isReplied: { type: Boolean, default: false },
    ipAddress: { type: String, default: '' },
    userAgent: { type: String, default: '' }
  },
  { timestamps: true }
);

MessageSchema.index({ createdAt: -1 });
MessageSchema.index({ isRead: 1 });

export default mongoose.model<IMessage>('Message', MessageSchema);
