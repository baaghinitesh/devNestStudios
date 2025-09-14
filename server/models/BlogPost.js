const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
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
  excerpt: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  featuredImage: String,
  author: {
    name: {
      type: String,
      required: true
    },
    avatar: String,
    bio: String
  },
  categories: [{
    type: String,
    trim: true
  }],
  tags: [{
    type: String,
    trim: true
  }],
  readTime: {
    type: Number,
    default: 5
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  publishedAt: Date,
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for better query performance
blogPostSchema.index({ isPublished: 1, publishedAt: -1 });
blogPostSchema.index({ slug: 1 });
blogPostSchema.index({ categories: 1, isPublished: 1 });
blogPostSchema.index({ tags: 1, isPublished: 1 });
blogPostSchema.index({ isFeatured: 1, isPublished: 1 });

module.exports = mongoose.model('BlogPost', blogPostSchema);