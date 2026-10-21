import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import adminShipmentRoutes from './routes/adminShipmentRoutes.js';
import trackingRoutes from './routes/trackingRoutes.js';
import { Shipment } from './models/Shipment.js';
import { sampleShipments } from './utils/memoryStorage.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/admin', authRoutes);
app.use('/api/admin/shipments', adminShipmentRoutes);
app.use('/api/shipments', trackingRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'SKY2SEA Logistics Backend API' });
});

// Seed default sample shipment if empty
const seedSampleData = async () => {
  if (!global.USE_IN_MEMORY_DB) {
    try {
      const count = await Shipment.countDocuments();
      if (count === 0) {
        await Shipment.create(sampleShipments[0]);
        console.log('[Seed] Created default sample shipment HGCK260793637 in MongoDB.');
      }
    } catch (e) {
      console.log('[Seed] DB seed skipped:', e.message);
    }
  }
};

// Start Server
const listenOnPort = (port, maxRetries = 5) => {
  const server = app.listen(port, () => {
    console.log(`[SKY2SEA Backend] Server running on http://localhost:${port}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE' && maxRetries > 0) {
      console.log(`[Port Warning] Port ${port} busy, attempting port ${port + 1}...`);
      listenOnPort(port + 1, maxRetries - 1);
    } else {
      console.error(`[Server Error] Failed to bind server:`, err.message);
    }
  });
};

const startServer = async () => {
  await connectDB();
  await seedSampleData();
  listenOnPort(Number(PORT));
};

startServer();
