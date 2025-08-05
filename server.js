const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoutes = require('./Routes/AuthRoutes');
const taskRoutes = require('./Routes/TaskRoutes');

dotenv.config();

const app = express();

// CORS for Vercel frontend
app.use(cors({
  origin: [
    'https://task-tracker-frontend-roan.vercel.app',
    // 'https://task-tracker-frontend-226yr1wsd-anshara-ayazs-projects.vercel.app'
    'https://task-tracker-frontend-f6aksx19j-anshara-ayazs-projects.vercel.app'
  ],
  credentials: true,
}));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Health check route
app.get('/', (req, res) => {
  res.send('Task Tracker Backend is running');
});

// MongoDB Connection & Server Start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error('❌ DB Connection Error:', err));
