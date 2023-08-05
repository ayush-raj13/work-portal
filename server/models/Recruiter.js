import mongoose from 'mongoose';
import validator from 'validator';
import passportLocalMongoose from 'passport-local-mongoose';

const RecruiterSchema = new mongoose.Schema(
  {
    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: [true, 'Please provide username'],
      unique: true,
    },
    contactEmail: {
      type: String,
      required: [true, 'Please provide email'],
      validate: {
        validator: validator.isEmail,
        message: 'Please provide a valid email',
      },
      unique: true,
    },
    bio: {
      type: String,
    },
    ats: {
      type: String,
      required: true,
    },
    roles: {
      type: [String],
      required: true,
    },
    fund: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { collation: { locale: 'en' } },
);

RecruiterSchema.plugin(passportLocalMongoose);
export default mongoose.model('Recruiter', RecruiterSchema);
