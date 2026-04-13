const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');

const app = express();


// middleware
app.use(cors());
app.use(express.json());


// routes
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);


// test route
app.get('/', (req, res) => {
  res.send('API running...');
});


// start server
app.listen(process.env.PORT, () => {

  console.log(`Server running on port ${process.env.PORT}`);

});