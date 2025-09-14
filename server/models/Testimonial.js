const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true,
    trim: true
  },
  clientPosition: {
    type: String,
    required: true,
    trim: true
  },
  companyName: {
    type: String,
    required: true,
    trim: true
  },
  companyTag: {
    type: String,
    trim: true // e.g., "FinTech", "Enterprise SaaS", "MarTech"
  },
  content: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },
  avatar: String,
  companyLogo: String,
  clientImage: String,
  location: {
    city: String,
    country: String,
    countryCode: String // e.g., "australia", "usa", "sweden"
  },
  projectType: String,
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for better query performance
testimonialSchema.index({ isActive: 1, isFeatured: 1 });
testimonialSchema.index({ companyName: 1 });
testimonialSchema.index({ order: 1 });

module.exports = mongoose.model('Testimonial', testimonialSchema);