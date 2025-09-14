const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email']
  },
  company: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  projectType: {
    type: String,
    enum: ['Web Development', 'Mobile Development', 'UI/UX Design', 'Discovery Phase', 'Cloud Implementation', 'Other'],
    default: 'Other'
  },
  budget: {
    type: String,
    enum: ['Under $10k', '$10k - $50k', '$50k - $100k', '$100k+', 'Not sure']
  },
  timeline: {
    type: String,
    enum: ['ASAP', '1-3 months', '3-6 months', '6+ months', 'Flexible']
  },
  message: {
    type: String,
    required: true
  },
  source: {
    type: String,
    enum: ['Website', 'Referral', 'LinkedIn', 'Google', 'Other'],
    default: 'Website'
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'in-progress', 'completed', 'closed'],
    default: 'new'
  },
  notes: String,
  assignedTo: String
}, {
  timestamps: true
});

// Index for better query performance
contactSchema.index({ status: 1, createdAt: -1 });
contactSchema.index({ email: 1 });
contactSchema.index({ projectType: 1 });

module.exports = mongoose.model('Contact', contactSchema);