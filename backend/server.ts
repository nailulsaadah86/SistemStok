import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';

import './config/database'; // Test Supabase connection

import authRoutes from './routes/auth';
import productRoutes from './routes/products';
import supplierRoutes from './routes/suppliers';
import transactionRoutes from './routes/transactions';
import expenseRoutes from './routes/expenses';

const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/expenses', expenseRoutes);

const PORT = Number(process.env.PORT) || 5000;
console.log('Attempting to start server on port', PORT);

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running successfully on port ${PORT}.`);
}).on('error', (err: any) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`ERROR: Port ${PORT} is ALREADY IN USE by another process.`);
    console.error(`Please close any other windows running this back-end.`);
    process.exit(1);
  } else {
    console.error('SERVER FATAL ERROR:', err);
    process.exit(1);
  }
});

// Prevent immediate exit
server.keepAliveTimeout = 120000;

process.on('unhandledRejection', (reason, promise) => {
  console.error('UNHANDLED REJECTION:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION:', err);
  process.exit(1);
});
