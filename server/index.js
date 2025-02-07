import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jobRoutes from './src/routes/jobs.js';
import userRoutes from './src/routes/users.js';
import { errorHandler } from './src/middleware/errorHandler.js';

dotenv.config();
const app = express();

app.use(cors());
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/jobs', jobRoutes);
app.use('/api/users', userRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));