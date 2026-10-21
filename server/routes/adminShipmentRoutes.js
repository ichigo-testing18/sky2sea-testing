import express from 'express';
import { adminAuthMiddleware } from '../middleware/authMiddleware.js';
import {
  getAllShipments,
  createShipment,
  getShipmentById,
  updateShipment,
  updateMilestone
} from '../controllers/shipmentController.js';

const router = express.Router();

// All routes require Admin JWT Auth
router.use(adminAuthMiddleware);

router.get('/', getAllShipments);
router.post('/', createShipment);
router.get('/:id', getShipmentById);
router.put('/:id', updateShipment);
router.put('/:id/tracking/:milestone', updateMilestone);

export default router;
