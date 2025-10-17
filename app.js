const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // ✅ Import CORS
const uploadRoutes = require('./routes/upload');
require('dotenv').config();

const app = express();

// ✅ Enable CORS for your frontend
app.use(cors({
  origin: 'http://127.0.0.1:5500',
  methods: ['POST'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Register routes once (no need to duplicate)
app.use('/api', uploadRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.listen(process.env.PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${process.env.PORT}`);
});
app.get('/api/test', (req, res) => {
  res.send('Server is reachable');
});