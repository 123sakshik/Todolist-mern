import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { apiRoute, apiProtected } from './routes/api.js';
import constants from './utils/constants.js';
import AuthMiddleware from './middlewares/AuthMiddleware.js';

const { DB_CONNECT } = constants();

const app = express();

// Use the CORS middleware
app.use(cors({
  origin: 'http://localhost:3000', // Specify the origin you want to allow
}));

mongoose.connect(DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to database successfully");
    const PORT = 8000;
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });

app.use(express.json());
app.use('/api', apiRoute);
app.use('/api', AuthMiddleware, apiProtected);
