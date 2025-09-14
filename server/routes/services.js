const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

// Default services data based on actual TechMagic website structure
const defaultServices = [
  {
    _id: '1',
    title: 'Discovery phase',
    subtitle: 'Discovery phase of product development',
    description: 'A discovery phase is necessary to align business goals with an engineering team, avoid costly mistakes, and plan a smooth start of actual product development. Our experienced business analysts and software architects map user journeys, conduct technical analyses, and define requirements and project scope for precise cost estimation. After the discovery phase, you\'ll receive a team composition plan, vision and scope document, technical and cost proposal with estimates, UX/UI prototype, and project plan based on your business objectives.',
    shortDescription: 'Align business goals with engineering team and plan smooth product development start.',
    category: 'Software Development',
    features: ['Business Analysis', 'Technical Analysis', 'Requirements Definition', 'Cost Estimation', 'UX/UI Prototype', 'Project Planning'],
    technologies: ['Business Analysis Tools', 'Technical Documentation', 'Wireframing Tools', 'Prototyping'],
    slug: 'discovery-phase',
    detailPageUrl: 'discovery-phase.html',
    isActive: true,
    order: 1
  },
  {
    _id: '2',
    title: 'UX/UI design',
    subtitle: 'UX/UI design services',
    description: 'We create unique, simple, client-centered designs for web and mobile apps of any complexity. Every element, line, and color are intentional and based on the end user\'s preferences to ensure market success. DevNestStudios\'s UX/UI designers orchestrate platform features, elements, components, libraries, and patterns to transform complex user flows into a seamless user experience and intuitive interface. Our clients receive a clean and intuitive design tailored for your target audience that works smoothly on every platform.',
    shortDescription: 'Create unique, client-centered designs for web and mobile apps of any complexity.',
    category: 'Software Development',
    features: ['User Experience Design', 'User Interface Design', 'Prototyping', 'Design Systems', 'Responsive Design', 'User Research'],
    technologies: ['Figma', 'Sketch', 'Adobe XD', 'InVision', 'Principle', 'Framer'],
    slug: 'ux-ui-design',
    detailPageUrl: 'ui-ux-design.html',
    isActive: true,
    order: 2
  },
  {
    _id: '3',
    title: 'Web development',
    subtitle: 'Web app development services',
    description: 'Web development is our core competence. DevNestStudios covers all steps of web development, from requirement analysis and design to choosing the optimal tech stack, engineering, deployment, and software maintenance. We build robust and scalable solutions for any objectives under the attentive eye of the CoE unit. As a product development services provider, we create fast and easy-to-use applications from dashboards to CRMs, analytics tools, ERP software to investment apps. The complexity of features and high data load stay behind the curtain for the end-users. We ensure the application "flies" on every platform and device.',
    shortDescription: 'Full-stack web development from requirement analysis to deployment and maintenance.',
    category: 'Software Development',
    features: ['Full-Stack Development', 'Responsive Design', 'Performance Optimization', 'SEO Optimization', 'Maintenance & Support', 'Scalable Architecture'],
    technologies: ['React', 'Node.js', 'Next.js', 'Vue.js', 'Angular', 'MongoDB', 'PostgreSQL', 'AWS'],
    slug: 'web-development',
    detailPageUrl: 'web-development.html',
    isActive: true,
    order: 3
  },
  {
    _id: '4',
    title: 'Mobile development',
    subtitle: 'Mobile app development services',
    description: 'With software product development services, we provide iOS and Android app development, covering backend, frontend, infrastructure, and database configuration. Our software developers enhance your app with efficient navigation, robust security measures, and effective data management features. We develop native and cross-platform mobile applications that deliver exceptional user experience across all devices.',
    shortDescription: 'iOS and Android app development with backend, frontend, and infrastructure setup.',
    category: 'Software Development',
    features: ['iOS Development', 'Android Development', 'Cross-Platform Development', 'App Store Optimization', 'Push Notifications', 'Mobile Backend'],
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Xamarin', 'Firebase'],
    slug: 'mobile-development',
    detailPageUrl: 'mobile-development.html',
    isActive: true,
    order: 4
  },
  {
    _id: '5',
    title: 'Test automation',
    subtitle: 'Quality Assurance during Software Development Lifecycle',
    description: 'Delivering product development services, we set the test automation process from scratch, reducing regression testing time and risk of human error, shortening time to market, and ensuring reduced development costs. Our QA team implements comprehensive testing strategies including unit testing, integration testing, and end-to-end testing.',
    shortDescription: 'Test automation from scratch to reduce regression testing time and ensure quality.',
    category: 'Software Development',
    features: ['Test Automation', 'Unit Testing', 'Integration Testing', 'E2E Testing', 'Performance Testing', 'Manual Testing'],
    technologies: ['Jest', 'Cypress', 'Selenium', 'Playwright', 'TestRail', 'JMeter'],
    slug: 'test-automation',
    detailPageUrl: 'test-automation.html',
    isActive: true,
    order: 5
  },
  {
    _id: '6',
    title: 'Data engineering',
    subtitle: 'Data Engineering for Software Product Development',
    description: 'We provide end-to-end software solutions for designing, optimizing, and integrating database and data warehouse platforms. Also, we store and organize large amounts of data in a structured format, enabling easy access, analysis, and reporting. Our data engineering team builds robust data pipelines and analytics solutions.',
    shortDescription: 'End-to-end data solutions for databases, data warehouses, and analytics.',
    category: 'Other Services',
    features: ['Data Pipeline Design', 'Data Warehouse Setup', 'ETL Processes', 'Data Analysis', 'Reporting Systems', 'Big Data Solutions'],
    technologies: ['Apache Spark', 'Kafka', 'Snowflake', 'BigQuery', 'Redshift', 'Python'],
    slug: 'data-engineering',
    detailPageUrl: 'data-engineering.html',
    isActive: true,
    order: 6
  },
  {
    _id: '7',
    title: 'Cloud implementation',
    subtitle: 'Cloud Implementation Services',
    description: 'We offer cloud migration strategy, cloud computing, managed cloud services, cloud infrastructure and cloud application development to upgrade your cloud journey including security and maintenance. Our cloud specialists help you leverage the full potential of cloud technologies for scalability and cost optimization.',
    shortDescription: 'Cloud migration, infrastructure setup, and managed cloud services.',
    category: 'Cloud Services',
    features: ['Cloud Migration', 'Infrastructure Setup', 'Auto-scaling', 'Cost Optimization', '24/7 Monitoring', 'DevOps Implementation'],
    technologies: ['AWS', 'Microsoft Azure', 'Google Cloud Platform', 'Docker', 'Kubernetes', 'Terraform'],
    slug: 'cloud-implementation',
    detailPageUrl: 'cloud-implementation.html',
    isActive: true,
    order: 7
  },
  {
    _id: '8',
    title: 'Security',
    subtitle: 'Cybersecurity Services',
    description: 'DevNestStudios offers managed security and penetration testing services alongside internal security training. We conduct comprehensive security testing, dependency analysis, and configuration verifications to reduce app vulnerability. Our security experts ensure your applications meet the highest security standards.',
    shortDescription: 'Managed security, penetration testing, and security training services.',
    category: 'Security Services',
    features: ['Penetration Testing', 'Security Audits', 'Vulnerability Assessment', 'Security Training', 'Compliance', 'Threat Analysis'],
    technologies: ['Security Frameworks', 'Penetration Testing Tools', 'OWASP', 'ISO 27001', 'GDPR'],
    slug: 'security',
    detailPageUrl: 'security.html',
    isActive: true,
    order: 8
  },
  {
    _id: '9',
    title: 'Salesforce',
    subtitle: 'Salesforce Development Services',
    description: 'We provide Salesforce package development from scratch, Salesforce integration with 3rd-party applications, ERP systems, cloud storage tools, and payment solutions. Also, we do Salesforce custom development and technical implementation. Our Salesforce experts deliver comprehensive CRM solutions.',
    shortDescription: 'Salesforce development, integration, and custom implementation services.',
    category: 'Other Services',
    features: ['Custom Development', '3rd-party Integration', 'ERP Integration', 'Package Development', 'Technical Implementation', 'CRM Optimization'],
    technologies: ['Salesforce', 'Apex', 'Lightning', 'Visualforce', 'SOQL', 'REST APIs'],
    slug: 'salesforce',
    detailPageUrl: 'salesforce.html',
    isActive: true,
    order: 9
  },
  {
    _id: '10',
    title: 'CTO as a service',
    subtitle: 'CTO as a Service',
    description: 'CTO-level experts specialize in strategic technical guidance and support to organizations of all sizes. From technology roadmap development to technology stack choice and team management, CTO-level engineers provide technical vision, strategy, and implementation. Our virtual CTO services help startups and enterprises make informed technical decisions.',
    shortDescription: 'Strategic technical guidance and CTO-level expertise for organizations.',
    category: 'Other Services',
    features: ['Technical Strategy', 'Technology Roadmap', 'Team Management', 'Architecture Design', 'Technical Leadership', 'Strategic Planning'],
    technologies: ['Strategic Planning', 'Technology Assessment', 'Team Building', 'Architecture Review', 'Technical Consulting'],
    slug: 'cto-as-a-service',
    detailPageUrl: 'cto-as-a-service.html',
    isActive: true,
    order: 10
  }
];

// GET /api/services - Get all services
router.get('/', async (req, res) => {
  try {
    const { category, featured } = req.query;
    const query = { isActive: true };
    
    if (category) {
      query.category = category;
    }
    
    if (featured === 'true') {
      query.isFeatured = true;
    }

    const services = await Service.find(query).sort({ order: 1, createdAt: 1 });
    res.json(services);
  } catch (error) {
    console.error('Database error, using default services:', error.message);
    // Return filtered default services when database is not available
    let filteredServices = defaultServices;
    if (req.query.category) {
      filteredServices = defaultServices.filter(service => service.category === req.query.category);
    }
    if (req.query.featured === 'true') {
      filteredServices = filteredServices.filter(service => service.isFeatured);
    }
    res.json(filteredServices);
  }
});

// GET /api/services/:slug - Get service by slug
router.get('/:slug', async (req, res) => {
  try {
    const service = await Service.findOne({ 
      slug: req.params.slug, 
      isActive: true 
    });
    
    if (!service) {
      // Try to find in default services
      const defaultService = defaultServices.find(s => s.slug === req.params.slug);
      if (defaultService) {
        return res.json(defaultService);
      }
      return res.status(404).json({ message: 'Service not found' });
    }
    
    res.json(service);
  } catch (error) {
    console.error('Database error:', error.message);
    // Try to find in default services
    const defaultService = defaultServices.find(s => s.slug === req.params.slug);
    if (defaultService) {
      return res.json(defaultService);
    }
    res.status(500).json({ message: error.message });
  }
});

// POST /api/services - Create a new service (admin only)
router.post('/', async (req, res) => {
  try {
    const service = new Service(req.body);
    const newService = await service.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET /api/services/categories/all - Get all service categories
router.get('/categories/all', async (req, res) => {
  try {
    const categories = await Service.distinct('category', { isActive: true });
    res.json(categories);
  } catch (error) {
    console.error('Database error, using default categories:', error.message);
    const defaultCategories = [...new Set(defaultServices.map(service => service.category))];
    res.json(defaultCategories);
  }
});

module.exports = router;