const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoutes = require('./Routes/AuthRoutes');
const taskRoutes = require('./Routes/TaskRoutes');

dotenv.config();

const app = express();

// Enable CORS for frontend on localhost:3000 and allow credentials
app.use(cors({
  origin: 'https://task-tracker-frontend-roan.vercel.app',
  credentials: true,
}));


// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
// Add this route to respond to base URL requests
app.get('/', (req, res) => {
  res.send('Task Tracker Backend is running');
});
// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
})
.then(() => {
  console.log(' Connected to MongoDB');
  app.listen(5000, () => console.log('Server running on port 5000'));
})
.catch((err) => console.error(' DB Connection Error:', err));
