const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));

// Import Routes
const authRoutes = require('./routes/authRoutes'); 
const productRoutes = require('./routes/productRoutes'); 

// Use Routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);

// Default Route (For API Testing)
app.get('/', (req, res) => {
    res.send('🚀 NutriFill Backend is Running!');
});


// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
