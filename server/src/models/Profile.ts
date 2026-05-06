import mongoose, { Document, Schema } from 'mongoose';

export interface ISocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface IProfile extends Document {
  name: string;
  title: string;
  tagline: string;
  summary: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  resumeUrl: string;
  yearsOfExperience: number;
  socialLinks: ISocialLink[];
  highlights: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SocialLinkSchema = new Schema<ISocialLink>({
  platform: { type: String, required: true },
  url: { type: String, required: true },
  icon: { type: String, required: true }
});

const ProfileSchema = new Schema<IProfile>(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    tagline: { type: String, required: true },
    summary: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    location: { type: String, required: true },
    avatar: { type: String, default: '' },
    resumeUrl: { type: String, default: '' },
    yearsOfExperience: { type: Number, default: 0 },
    socialLinks: [SocialLinkSchema],
    highlights: [{ type: String }],
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model<IProfile>('Profile', ProfileSchema);
