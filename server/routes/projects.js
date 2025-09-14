const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// Default projects data 
const defaultProjects = [
  {
    _id: '1',
    title: 'Building a Micro-Investment App for an Australian FinTech Company',
    slug: 'bamboo-fintech-app',
    description: 'We helped Bamboo get a 700% increase in active users due to key features. The project involved building a comprehensive mobile application for micro-investments with advanced analytics.',
    shortDescription: 'Micro-investment mobile app that achieved 700% user growth.',
    clientName: 'Bamboo',
    industry: 'FinTech',
    technologies: ['React Native', 'Node.js', 'AWS', 'MongoDB', 'GraphQL'],
    teamSize: 12,
    duration: '8 months',
    isActive: true,
    isFeatured: true,
    order: 1
  }
];

// GET /api/projects - Get all projects
router.get('/', async (req, res) => {
  try {
    const { featured, industry, limit } = req.query;
    const query = { isActive: true };
    
    if (featured === 'true') {
      query.isFeatured = true;
    }
    
    if (industry) {
      query.industry = industry;
    }

    let projectsQuery = Project.find(query).sort({ order: 1, createdAt: -1 });
    
    if (limit) {
      projectsQuery = projectsQuery.limit(parseInt(limit));
    }

    const projects = await projectsQuery;
    res.json(projects);
  } catch (error) {
    console.error('Database error, using default projects:', error.message);
    let filteredProjects = defaultProjects;
    if (req.query.featured === 'true') {
      filteredProjects = defaultProjects.filter(project => project.isFeatured);
    }
    if (req.query.limit) {
      filteredProjects = filteredProjects.slice(0, parseInt(req.query.limit));
    }
    res.json(filteredProjects);
  }
});

// GET /api/projects/:slug - Get project by slug
router.get('/:slug', async (req, res) => {
  try {
    const project = await Project.findOne({ 
      slug: req.params.slug, 
      isActive: true 
    }).populate('testimonial');
    
    if (!project) {
      const defaultProject = defaultProjects.find(p => p.slug === req.params.slug);
      if (defaultProject) {
        return res.json(defaultProject);
      }
      return res.status(404).json({ message: 'Project not found' });
    }
    
    res.json(project);
  } catch (error) {
    console.error('Database error:', error.message);
    const defaultProject = defaultProjects.find(p => p.slug === req.params.slug);
    if (defaultProject) {
      return res.json(defaultProject);
    }
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;