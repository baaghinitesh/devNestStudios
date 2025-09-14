const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
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
  subtitle: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Software Development', 'Cloud Services', 'Security Services', 'Other Services']
  },
  features: [{
    type: String,
    trim: true
  }],
  technologies: [{
    type: String,
    trim: true
  }],
  icon: String,
  image: String,
  detailPageUrl: String,
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
serviceSchema.index({ category: 1, isActive: 1 });
serviceSchema.index({ slug: 1, isActive: 1 });
serviceSchema.index({ order: 1 });

module.exports = mongoose.model('Service', serviceSchema);