const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');

// Default testimonials data based on actual TechMagic website structure  
const defaultTestimonials = [
  {
    _id: '1',
    clientName: 'Blake Cassidy',
    clientPosition: 'CHIEF EXECUTIVE OFFICER AT BAMBOO',
    companyName: 'Bamboo',
    companyTag: 'FinTech',
    content: 'We interviewed seven highly recommended tech consulting groups and decided to use DevNestStudios due to their superior systems and processes. Thanks to DevNestStudios, we were able to experience a 700% increase in Bamboo active users due to the new features and capability they added.',
    rating: 5,
    avatar: '/images/testimonials/blake-cassidy.png',
    companyLogo: '/images/logos/bamboo.svg',
    clientImage: 'tm-bucket-for-images.s3.eu-west-1.amazonaws.com/client_6_2x_c77ba7ff82.png',
    location: {
      city: 'Perth',
      country: 'Australia',
      countryCode: 'australia'
    },
    isActive: true,
    isFeatured: true,
    order: 1
  },
  {
    _id: '2',
    clientName: 'Adrian King',
    clientPosition: 'CO-FOUNDER & CTO AT ELEMENTS.CLOUD',
    companyName: 'Elements.Cloud',
    companyTag: 'Enterprise SaaS',
    content: 'I cannot express how impressed we are by the commitment and dedication of your team. The recent set backs are frustrating but we will work through them. The comments and enthusiasm from early users is really, really encouraging. We are building a fantastic product, with a clear need, and a huge audience.',
    rating: 5,
    avatar: '/images/testimonials/adrian-king.png',
    companyLogo: '/images/logos/elements.svg',
    clientImage: 'tm-bucket-for-images.s3.eu-west-1.amazonaws.com/client_1_2x_3f94d9246e.png',
    location: {
      city: 'San Francisco',
      country: 'US',
      countryCode: 'usa'
    },
    isActive: true,
    isFeatured: true,
    order: 2
  },
  {
    _id: '3',
    clientName: 'Fréderique Pirenne',
    clientPosition: 'CO-FOUNDER AND CMO AT MYTELESCOPE',
    companyName: 'MyTelescope',
    companyTag: 'MarTech',
    content: 'This team comes back and tells us what we could improve, or they come up with workarounds. Sometimes we\'ll have to make decisions that might not seem logical from a development point of view but make absolute sense from a business point of view. The team will execute them anyway because it\'s important for the business. DevNestStudios is made of a team of critical thinkers who advise the business on which approaches are the fastest and most cost-effective…they do what\'s best for the business.',
    rating: 5,
    avatar: '/images/testimonials/frederique-pirenne.png',
    companyLogo: '/images/logos/telescope.svg',
    clientImage: 'tm-bucket-for-images.s3.eu-west-1.amazonaws.com/client_2_2x_6b498c76a0.png',
    location: {
      city: 'Sweden',
      country: 'Sweden',
      countryCode: 'sweden'
    },
    isActive: true,
    isFeatured: true,
    order: 3
  },
  {
    _id: '4',
    clientName: 'Matthew Akino-Wittering',
    clientPosition: 'Technical Product Lead',
    companyName: 'Acorn-I',
    companyTag: 'eCommerce',
    content: 'We\'ve been extremely pleased with our continuing relationship with DevNestStudios to develop solutions on top of the AWS stack. Their specialisation in the Serverless Framework and underlying Serverless Technologies has accelerated our product development.',
    rating: 5,
    avatar: '/images/testimonials/matthew-akino.png',
    companyLogo: '/images/logos/acorni.svg',
    clientImage: 'tm-bucket-for-images.s3.eu-west-1.amazonaws.com/client_3_2x_0336c7f9b6.png',
    location: {
      city: 'London',
      country: 'UK',
      countryCode: 'uk'
    },
    isActive: true,
    isFeatured: true,
    order: 4
  },
  {
    _id: '5',
    clientName: 'Seng Oon Toh',
    clientPosition: 'Chief Technology Officer',
    companyName: 'Huckleberry',
    companyTag: 'HealthTech',
    content: 'The strongest points of DevNestStudios are communication, delivery quality, timeliness, and accountability. They can deliver high-quality products while maintaining cost-efficiency. They\'ve been doing a good job of delivering our requests to send more development resources.',
    rating: 5,
    avatar: '/images/testimonials/seng-oon-toh.png',
    companyLogo: '/images/logos/huckleberry.svg',
    clientImage: 'tm-bucket-for-images.s3.eu-west-1.amazonaws.com/client_4_2x_74ec28fb28.png',
    location: {
      city: 'San Francisco',
      country: 'USA',
      countryCode: 'usa'
    },
    isActive: true,
    isFeatured: true,
    order: 5
  },
  {
    _id: '6',
    clientName: 'Sultan Murad Saidov',
    clientPosition: 'Co-Founder and President',
    companyName: 'Beamery',
    companyTag: 'HR Tech',
    content: 'Great team members on project, good communication, and partnership in general. DevNestStudios helped us to develop the frontend part of our talent management CRM. The team takes great pride in their work and they are very committed.',
    rating: 5,
    avatar: '/images/testimonials/sultan-saidov.png',
    companyLogo: '/images/logos/beamery.svg',
    clientImage: 'tm-bucket-for-images.s3.eu-west-1.amazonaws.com/client_5_2x_69f5096272.png',
    location: {
      city: 'London',
      country: 'UK',
      countryCode: 'uk'
    },
    isActive: true,
    isFeatured: true,
    order: 6
  }
];

// GET /api/testimonials - Get all testimonials
router.get('/', async (req, res) => {
  try {
    const { featured, limit } = req.query;
    const query = { isActive: true };
    
    if (featured === 'true') {
      query.isFeatured = true;
    }

    let testimonialsQuery = Testimonial.find(query).sort({ order: 1, createdAt: 1 });
    
    if (limit) {
      testimonialsQuery = testimonialsQuery.limit(parseInt(limit));
    }

    const testimonials = await testimonialsQuery;
    res.json(testimonials);
  } catch (error) {
    console.error('Database error, using default testimonials:', error.message);
    // Return filtered default testimonials when database is not available
    let filteredTestimonials = defaultTestimonials;
    if (req.query.featured === 'true') {
      filteredTestimonials = defaultTestimonials.filter(testimonial => testimonial.isFeatured);
    }
    if (req.query.limit) {
      filteredTestimonials = filteredTestimonials.slice(0, parseInt(req.query.limit));
    }
    res.json(filteredTestimonials);
  }
});

// GET /api/testimonials/:id - Get testimonial by ID
router.get('/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findOne({ 
      _id: req.params.id, 
      isActive: true 
    });
    
    if (!testimonial) {
      // Try to find in default testimonials
      const defaultTestimonial = defaultTestimonials.find(t => t._id === req.params.id);
      if (defaultTestimonial) {
        return res.json(defaultTestimonial);
      }
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    
    res.json(testimonial);
  } catch (error) {
    console.error('Database error:', error.message);
    // Try to find in default testimonials
    const defaultTestimonial = defaultTestimonials.find(t => t._id === req.params.id);
    if (defaultTestimonial) {
      return res.json(defaultTestimonial);
    }
    res.status(500).json({ message: error.message });
  }
});

// POST /api/testimonials - Create a new testimonial (admin only)
router.post('/', async (req, res) => {
  try {
    const testimonial = new Testimonial(req.body);
    const newTestimonial = await testimonial.save();
    res.status(201).json(newTestimonial);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;