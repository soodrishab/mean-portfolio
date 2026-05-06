import mongoose, { Document, Schema } from 'mongoose';

export interface ISkillItem {
  name: string;
  icon: string;
  proficiency: number; // 1-100
}

export interface ISkill extends Document {
  category: string;
  categoryIcon: string;
  items: ISkillItem[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const SkillItemSchema = new Schema<ISkillItem>({
  name: { type: String, required: true },
  icon: { type: String, default: '' },
  proficiency: { type: Number, min: 1, max: 100, default: 80 }
});

const SkillSchema = new Schema<ISkill>(
  {
    category: { type: String, required: true },
    categoryIcon: { type: String, default: '' },
    items: [SkillItemSchema],
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

SkillSchema.index({ order: 1 });

export default mongoose.model<ISkill>('Skill', SkillSchema);
