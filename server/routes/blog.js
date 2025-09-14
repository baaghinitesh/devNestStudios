const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');

// Default blog posts
const defaultBlogPosts = [
  {
    _id: '1',
    title: 'The Future of Software Development in 2024',
    slug: 'future-software-development-2024',
    excerpt: 'Explore the latest trends and technologies shaping the future of software development.',
    content: 'The software development landscape continues to evolve rapidly...',
    categories: ['Technology', 'Software Development'],
    tags: ['Future Tech', 'Development Trends'],
    readTime: 8,
    isPublished: true,
    isFeatured: true,
    publishedAt: new Date('2024-01-15')
  }
];

// GET /api/blog - Get all blog posts
router.get('/', async (req, res) => {
  try {
    const { featured, category, limit } = req.query;
    const query = { isPublished: true };
    
    if (featured === 'true') {
      query.isFeatured = true;
    }
    
    if (category) {
      query.categories = category;
    }

    let postsQuery = BlogPost.find(query).sort({ publishedAt: -1 });
    
    if (limit) {
      postsQuery = postsQuery.limit(parseInt(limit));
    }

    const posts = await postsQuery;
    res.json(posts);
  } catch (error) {
    console.error('Database error, using default blog posts:', error.message);
    let filteredPosts = defaultBlogPosts;
    if (req.query.featured === 'true') {
      filteredPosts = defaultBlogPosts.filter(post => post.isFeatured);
    }
    if (req.query.limit) {
      filteredPosts = filteredPosts.slice(0, parseInt(req.query.limit));
    }
    res.json(filteredPosts);
  }
});

// GET /api/blog/:slug - Get blog post by slug
router.get('/:slug', async (req, res) => {
  try {
    const post = await BlogPost.findOne({ 
      slug: req.params.slug, 
      isPublished: true 
    });
    
    if (!post) {
      const defaultPost = defaultBlogPosts.find(p => p.slug === req.params.slug);
      if (defaultPost) {
        return res.json(defaultPost);
      }
      return res.status(404).json({ message: 'Blog post not found' });
    }
    
    // Increment views
    post.views += 1;
    await post.save();
    
    res.json(post);
  } catch (error) {
    console.error('Database error:', error.message);
    const defaultPost = defaultBlogPosts.find(p => p.slug === req.params.slug);
    if (defaultPost) {
      return res.json(defaultPost);
    }
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;