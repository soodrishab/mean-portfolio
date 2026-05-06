import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  thumbnail: string;
  images: string[];
  demoUrl: string;
  githubUrl: string;
  technologies: string[];
  features: string[];
  category: string;
  isFeatured: boolean;
  isLive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    longDescription: { type: String, default: '' },
    thumbnail: { type: String, default: '' },
    images: [{ type: String }],
    demoUrl: { type: String, default: '' },
    githubUrl: { type: String, default: '' },
    technologies: [{ type: String }],
    features: [{ type: String }],
    category: { type: String, default: 'web' },
    isFeatured: { type: Boolean, default: false },
    isLive: { type: Boolean, default: true },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

ProjectSchema.index({ order: 1 });

export default mongoose.model<IProject>('Project', ProjectSchema);
