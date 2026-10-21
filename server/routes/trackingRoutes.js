import express from 'express';
import { trackShipment } from '../controllers/shipmentController.js';

const router = express.Router();

// Public customer tracking endpoint (NO admin auth required!)
router.get('/track/:blNumber', trackShipment);

export default router;
