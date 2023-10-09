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
    headline: {
      type: String,
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
          max: new Date().getFullYear() + 20,
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
    image: {
      type: String,
      required: true,
    },
    experience: [
      {
        title: {
          type: String,
          required: true,
        },
        employmentType: {
          type: String,
          enum: ['Full Time', 'Part Time', 'Work From Home', 'Internship', 'Self Employed', 'Freelance', 'Trainee'],
          required: true,
        },
        companyName: {
          type: String,
          required: true,
        },
        location: {
          type: String,
          required: true,
        },
        startDate: {
          type: Date,
          required: true,
        },
        endDate: {
          type: Date,
          required: true,
          validate: [
            {
              validator(value) {
                return this.startDate <= value;
              },
              msg: 'End date should be greater than or equal to Start date',
            },
          ],
        },
      },
    ],
    projects: [
      {
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        demoLink: {
          type: String,
          required: false,
        },
        repositoryLink: {
          type: String,
          required: false,
        },
      },
    ],
    achievements: [
      {
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: false,
        },
        certificate: {
          type: String,
          required: false,
        },
        link: {
          type: String,
          required: false,
        },
      },
    ],
    courses: [
      {
        title: {
          type: String,
          required: true,
        },
        certificate: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { collation: { locale: 'en' } },
);

// Define a virtual property for monthsOfExperience
jobApplicantSchema.virtual('monthsOfExperience').get(function () {
  if (!this.experience || this.experience.length === 0) {
    return 0; // Return 0 if experience is not defined or empty
  }

  let totalMonths = 0;

  for (const experience of this.experience) {
    const startDate = new Date(experience.startDate);
    const endDate = experience.endDate ? new Date(experience.endDate) : new Date();

    // Calculate the difference between start and end dates in months
    // eslint-disable-next-line max-len
    const diffInMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());

    totalMonths += diffInMonths;
  }

  return totalMonths;
});

// Enable virtuals in JSON output
jobApplicantSchema.set('toJSON', { virtuals: true });

export default mongoose.model('JobApplicantInfo', jobApplicantSchema);
