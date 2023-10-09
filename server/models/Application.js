import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    applicantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
    },
    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recruiter',
    },
    status: {
      type: String,
      enum: ['applied', 'shortlisted', 'accepted', 'rejected'],
      default: 'applied',
      required: true,
    },
    dateOfApplication: {
      type: Date,
      default: Date.now,
    },
    // dateOfJoining: {
    //   type: Date,
    //   validate: [
    //     {
    //       validator(value) {
    //         return this.dateOfApplication <= value;
    //       },
    //       msg: 'dateOfJoining should be greater than dateOfApplication',
    //     },
    //   ],
    // },
    sop: {
      type: String,
      validate: {
        validator(v) {
          return v.split(' ').filter((ele) => { return ele !== ''; }).length <= 250;
        },
        msg: 'Statement of purpose should not be greater than 250 words',
      },
    },
    resume: {
      type: String,
      required: true,
    },
  },
  { collation: { locale: 'en' } },
);

export default mongoose.model('application', applicationSchema);
