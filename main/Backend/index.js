// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const authRoutes = require('./routes/auth');
// const postRoutes = require('./routes/posts');

// dotenv.config();
// const app = express();
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // Routes
// app.use('/auth', authRoutes);
// app.use('/posts', postRoutes);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));



const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

const cors = require('cors');



dotenv.config();
const app = express();
app.use(cors({
  origin: '*', // This allows all origins
}));
app.use(express.json());

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};

connectDB();

// Routes
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await app.listen(PORT);
  console.log(`Server running on http://localhost:${PORT}`);
};

startServer();
