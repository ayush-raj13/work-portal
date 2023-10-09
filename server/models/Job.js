import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    // userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    // },
    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recruiter',
    },
    // applicantId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'JobApplicantInfo',
    // },
    title: {
      type: String,
      required: true,
    },
    maxApplicants: {
      type: Number,
      validate: [
        {
          validator: Number.isInteger,
          msg: 'maxApplicants should be an integer',
        },
        {
          validator(value) {
            return value > 0;
          },
          msg: 'maxApplicants should greater than 0',
        },
      ],
    },
    maxPositions: {
      type: Number,
      validate: [
        {
          validator: Number.isInteger,
          msg: 'maxPostions should be an integer',
        },
        {
          validator(value) {
            return value > 0;
          },
          msg: 'maxPositions should greater than 0',
        },
      ],
    },
    activeApplications: {
      type: Number,
      default: 0,
      validate: [
        {
          validator: Number.isInteger,
          msg: 'activeApplications should be an integer',
        },
        {
          validator(value) {
            return value >= 0;
          },
          msg: 'activeApplications should greater than equal to 0',
        },
      ],
    },
    acceptedCandidates: {
      type: Number,
      default: 0,
      validate: [
        {
          validator: Number.isInteger,
          msg: 'acceptedCandidates should be an integer',
        },
        {
          validator(value) {
            return value >= 0;
          },
          msg: 'acceptedCandidates should greater than equal to 0',
        },
      ],
    },
    dateOfPosting: {
      type: Date,
      default: Date.now,
    },
    deadline: {
      type: Date,
      validate: [
        {
          validator(value) {
            return this.dateOfPosting < value;
          },
          msg: 'deadline should be greater than dateOfPosting',
        },
      ],
    },
    skillsets: [String],
    responsibilities: [String],
    qualifications: [String],
    preferredQualifications: [String],
    jobType: {
      type: String,
      enum: ['Full Time', 'Part Time', 'Work From Home', 'Internship', 'Trainee'],
      required: true,
    },
    duration: {
      type: Number,
      min: 0,
      validate: [
        {
          validator: Number.isInteger,
          msg: 'Duration should be an integer',
        },
      ],
    },
    experience: {
      type: Number,
      required: true,
      validate: [
        {
          validator: Number.isInteger,
          msg: 'It should be no',
        },
        {
          validator(value) {
            return value >= 0;
          },
          msg: 'Experience should be positive',
        },
      ],
    },
    salary: {
      type: Number,
      validate: [
        {
          validator: Number.isInteger,
          msg: 'Salary should be an integer',
        },
        {
          validator(value) {
            return value >= 0;
          },
          msg: 'Salary should be positive',
        },
      ],
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
  },
  { collation: { locale: 'en' } },
);

export default mongoose.model('Job', jobSchema);
