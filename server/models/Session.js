import mongoose from 'mongoose';

// Create a new schema
const sessionSchema = new mongoose.Schema({
  instituteName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
    match: /^\d{6}$/,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  noOfAttendees: {
    type: Number,
    required: true,
    min: 1,
  },
  attendeesData: {
    type: String, // Assuming the file will be stored as a string representing the file path or URL
    required: true,
  },
});

// Create a model using the schema
export default mongoose.model('Session', sessionSchema);
