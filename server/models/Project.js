const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    trim: true
  },
  clientName: {
    type: String,
    required: true,
    trim: true
  },
  industry: {
    type: String,
    required: true,
    trim: true
  },
  projectType: String,
  challenge: String,
  solution: String,
  results: [String],
  technologies: [{
    type: String,
    trim: true
  }],
  teamSize: Number,
  duration: String,
  projectUrl: String,
  caseStudyUrl: String,
  images: {
    hero: String,
    gallery: [String],
    mockups: [String]
  },
  testimonial: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Testimonial'
  },
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
projectSchema.index({ industry: 1, isActive: 1 });
projectSchema.index({ slug: 1, isActive: 1 });
projectSchema.index({ isFeatured: 1, isActive: 1 });
projectSchema.index({ order: 1 });

module.exports = mongoose.model('Project', projectSchema);