import mongoose from 'mongoose';

const jobApplicantSchema = new mongoose.Schema(
  {
    applicantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    education: [
      {
        institutionName: {
          type: String,
          required: true,
        },
        startYear: {
          type: Number,
          min: 1930,
          max: new Date().getFullYear(),
          required: true,
          validate: Number.isInteger,
        },
        endYear: {
          type: Number,
          max: new Date().getFullYear(),
          validate: [
            { validator: Number.isInteger, msg: 'Year should be an integer' },
            {
              validator(value) {
                return this.startYear <= value;
              },
              msg: 'End year should be greater than or equal to Start year',
            },
          ],
        },
      },
    ],
    skills: [String],
    // resume: {
    //   type: String,
    // },
    // profile: {
    //   type: String,
    // },
  },
  { collation: { locale: 'en' } },
);

export default mongoose.model('JobApplicantInfo', jobApplicantSchema);
