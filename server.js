require('dotenv').config();
const express = require('express');
const path = require('path');

const connectDB = require('./config/db');

const webRoutes = require('./routes/web.routes');
const apiRoutes = require('./routes/api.routes');

const app = express();

// DB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/', webRoutes);
app.use('/api', apiRoutes);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
