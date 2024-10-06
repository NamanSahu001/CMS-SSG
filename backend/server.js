// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Sample route
app.get('/', (req, res) => {
  res.send('CMS API is running');
});

// Import routes
const authRoutes = require('./routes/auth');
const articleRoutes = require('./routes/articles');
const authenticateToken = require('./middleware/auth');

// Add your other routes here

app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
app.get('/test', authenticateToken, (req, res) => {
  res.json({ message: 'Authenticated successfully!', user: req.user });
});

const connectDB = async () => {
  try {
      await mongoose.connect(process.env.MONGO_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
      });
      console.log('MongoDB connected');
  } catch (err) {
      console.error('MongoDB connection error:', err.message);
      process.exit(1); // Exit process with failure
  }
};

// Call connectDB function somewhere in your server file (e.g., server.js)
connectDB();