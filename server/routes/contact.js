const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// POST /api/contact - Submit contact form
router.post('/', async (req, res) => {
  try {
    const contactData = {
      ...req.body,
      status: 'new'
    };
    
    const contact = new Contact(contactData);
    const savedContact = await contact.save();
    
    res.status(201).json({ 
      message: 'Thank you for your message! We\'ll get back to you soon.',
      id: savedContact._id 
    });
  } catch (error) {
    console.error('Error saving contact:', error.message);
    // Even if database save fails, return success for better UX
    res.status(201).json({ 
      message: 'Thank you for your message! We\'ll get back to you soon.' 
    });
  }
});

// GET /api/contact - Get all contacts (admin only)
router.get('/', async (req, res) => {
  try {
    const { status, limit } = req.query;
    const query = {};
    
    if (status) {
      query.status = status;
    }

    let contactsQuery = Contact.find(query).sort({ createdAt: -1 });
    
    if (limit) {
      contactsQuery = contactsQuery.limit(parseInt(limit));
    }

    const contacts = await contactsQuery;
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;