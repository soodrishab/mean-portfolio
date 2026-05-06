import mongoose, { Document, Schema } from 'mongoose';

export interface IProject {
  name: string;
  client: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface IExperience extends Document {
  company: string;
  companyUrl: string;
  companyLogo: string;
  position: string;
  location: string;
  startDate: Date;
  endDate: Date | null;
  isCurrentRole: boolean;
  description: string;
  projects: IProject[];
  technologies: string[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>({
  name: { type: String, required: true },
  client: { type: String, required: true },
  description: { type: String, required: true },
  achievements: [{ type: String }],
  technologies: [{ type: String }]
});

const ExperienceSchema = new Schema<IExperience>(
  {
    company: { type: String, required: true },
    companyUrl: { type: String, default: '' },
    companyLogo: { type: String, default: '' },
    position: { type: String, required: true },
    location: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, default: null },
    isCurrentRole: { type: Boolean, default: false },
    description: { type: String, default: '' },
    projects: [ProjectSchema],
    technologies: [{ type: String }],
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

ExperienceSchema.index({ order: 1 });

export default mongoose.model<IExperience>('Experience', ExperienceSchema);
