import mongoose from 'mongoose';

// Custom email validation function
const validateEmail = (email) => {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

// Create a new schema
const attendeesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validateEmail,
      message: 'Invalid email format',
    },
  },
});

// Create a model using the schema
export default mongoose.model('Attendees', attendeesSchema);
