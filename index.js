const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');

require('dotenv').config();

// Connect to DB
connectDB();

// Middlewares
app.use(cors({ origin: '*' }));
app.use(express.json());

// FIX: Increase payload limit
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Root Route
app.get('/', (req, res) => {
  res.send('Hello amushivani');
});

// -------------------- ROUTES IMPORT --------------------
const bannerRoutes = require('./Routers/BannerRoutes');
const teamRoutes = require('./Routers/TeamRoutes');
const aboutUsRoutes = require('./Routers/AboutUsRoutes');
const testimonialRoutes = require('./Routers/TestimonialRoutes');
const footerRoutes = require('./Routers/FooterRoutes');
const enquiryRoutes = require('./Routers/enquiryRoutes');

// -------------------- ROUTES USE ssdd------------------------
app.use('/', bannerRoutes);
app.use('/', teamRoutes);
app.use('/', aboutUsRoutes);
app.use('/', testimonialRoutes);
app.use('/', footerRoutes);
app.use('/api', enquiryRoutes);

// Start Server
app.listen(process.env.Port, '0.0.0.0', () => {
  console.log(`listening on ${process.env.Port}`);
  console.log(`Connected to DB → ${process.env.MONGO_URI}`);
});
