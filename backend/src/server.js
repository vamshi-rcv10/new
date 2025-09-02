import dotenv from 'dotenv';
dotenv.config(); // Must be first
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import path, { dirname } from 'path';

// Routers
import foodRouter from './routers/food.router.js';
import userRouter from './routers/user.router.js';
import orderRouter from './routers/order.router.js';
import uploadRouter from './routers/upload.router.js';

// Database
import { dbconnect } from './config/database.config.js';
await dbconnect(); // Ensure DB is connected before handling requests

// Paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));

// API routes
app.use('/api/foods', foodRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/upload', uploadRouter);

// Serve frontend build
const publicFolder = path.join(__dirname, '../frontend/build'); // <-- React build folder
app.use(express.static(publicFolder));

app.get('*', (req, res) => {
  res.sendFile(path.join(publicFolder, 'index.html'));
});

// Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
