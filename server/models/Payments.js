import mongoose from 'mongoose';

// Create a new schema
const paymentsSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  paymentDate: {
    type: Date,
    required: true,
  },
});

// Create a model using the schema
export default mongoose.model('Payments', paymentsSchema);
