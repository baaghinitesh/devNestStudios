const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Security middleware
app.use(helmet());

// Rate limiting
// Enable trust proxy for proxied environments (development only)
if (process.env.NODE_ENV === 'development') {
  app.set('trust proxy', true);
}

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  skip: (req) => process.env.NODE_ENV === 'development' // Skip rate limiting in development
});
app.use('/api/', limiter);

// CORS configuration
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// MongoDB Connection with graceful error handling
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/devneststudios');
    console.log('✅ Connected to MongoDB successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.log('🔄 MongoDB connection failed, continuing without database');
    // Don't exit the process, allow server to start without database
  }
}

connectDB();

// Handle MongoDB connection events
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Routes
app.use('/api/services', require('./routes/services'));
app.use('/api/testimonials', require('./routes/testimonials'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/blog', require('./routes/blog'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    message: 'DevNestStudios Server is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Server Error:', error);
  res.status(500).json({ 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\\n🔄 Shutting down gracefully...');
  try {
    await mongoose.connection.close();
    console.log('✅ MongoDB connection closed.');
  } catch (error) {
    console.error('❌ Error during MongoDB shutdown:', error);
  }
  process.exit(0);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 DevNestStudios Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  if (process.env.CLIENT_URL) {
    console.log(`🔗 Accepting requests from: ${process.env.CLIENT_URL}`);
  }
});

module.exports = app;