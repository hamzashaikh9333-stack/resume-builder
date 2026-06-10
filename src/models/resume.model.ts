import { IResume } from "../types/resume.type";
import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema<IResume>(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      default: "My Resume",
    },
    summary: {
      type: String,
      default: "Summary",
    },
    workExperience: {
      type: [
        {
          company: String,
          position: String,
          startDate: String,
          endDate: String,
          description: String,
        },
      ],
      default: [],
    },
    projects: {
      type: [
        {
          title: String,
          description: String,
          githubLink: String,
          liveLink: String,
          techStack: [String],
        },
      ],
      default: [],
    },
    education: {
      type: [
        {
          degree: String,
          institute: String,
          startDate: String,
          endDate: String,
        },
      ],
      default: [],
    },
    skills: {
      type: [String],
      default: [],
    },
    certifications: {
      type: [String],
      default: [],
    },
    personalInfo: {
      type: {
        fullname: String,
        email: String,
        mobile: String,
        address: String,
        linkedin: String,
        github: String,
        portfolio: String,
      },
      default: {},
    }, 
  },
  {
    timestamps: true,
  },
);

const resumeModel = mongoose.model("Resume", resumeSchema);

export default resumeModel;
