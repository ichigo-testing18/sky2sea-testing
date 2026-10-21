import { Shipment } from '../models/Shipment.js';
import { memoryStore } from '../utils/memoryStorage.js';

// Public Tracking API
export const trackShipment = async (req, res) => {
  try {
    const rawBl = req.params.blNumber;
    if (!rawBl) {
      return res.status(400).json({
        success: false,
        message: 'BL Number is required'
      });
    }

    const cleanBl = String(rawBl).trim().toUpperCase();
    let shipment = null;

    if (!global.USE_IN_MEMORY_DB) {
      try {
        shipment = await Shipment.findOne({ blNumber: cleanBl }).lean();
      } catch (e) {
        console.warn('MongoDB search failed, checking memory storage:', e.message);
        shipment = memoryStore.getByBlNumber(cleanBl);
      }
    } else {
      shipment = memoryStore.getByBlNumber(cleanBl);
    }

    if (!shipment) {
      return res.status(404).json({
        success: false,
        message: 'Shipment not found'
      });
    }

    // Format output for customer view
    const formattedResponse = {
      success: true,
      shipment: {
        jobNumber: shipment.jobNumber || '-',
        freightType: shipment.freightType || 'Ocean',
        loadType: shipment.loadType || 'LCL',
        containers: shipment.containers || '-',
        carrier: shipment.carrier || '-',
        bookingNumber: shipment.bookingNumber || '-',
        blNumber: shipment.blNumber,
        blType: shipment.blType || 'Original',
        commodityType: shipment.commodityType || 'General Cargo',
        commodityDescription: shipment.commodityDescription || '-',
        customerRefNumber: shipment.customerRefNumber || '-',
        poNumber: shipment.poNumber || '-',
        tracking: shipment.tracking,
        updatedAt: shipment.updatedAt
      }
    };

    return res.json(formattedResponse);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching tracking information.'
    });
  }
};

// Admin: Get all shipments
export const getAllShipments = async (req, res) => {
  try {
    let shipments = [];
    if (!global.USE_IN_MEMORY_DB) {
      try {
        shipments = await Shipment.find().sort({ updatedAt: -1 }).lean();
      } catch (e) {
        shipments = memoryStore.getAll();
      }
    } else {
      shipments = memoryStore.getAll();
    }
    return res.json({ success: true, shipments });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve shipments.' });
  }
};

// Admin: Create new shipment
export const createShipment = async (req, res) => {
  try {
    const {
      blNumber,
      jobNumber,
      freightType,
      loadType,
      containers,
      carrier,
      bookingNumber,
      blType,
      commodityType,
      commodityDescription,
      customerRefNumber,
      poNumber,
      tracking
    } = req.body;

    if (!blNumber || !String(blNumber).trim()) {
      return res.status(400).json({ success: false, message: 'BL Number is required.' });
    }

    const cleanBl = String(blNumber).trim().toUpperCase();

    // Check duplicate BL number
    if (!global.USE_IN_MEMORY_DB) {
      try {
        const existing = await Shipment.findOne({ blNumber: cleanBl });
        if (existing) {
          return res.status(400).json({ success: false, message: `BL Number ${cleanBl} already exists.` });
        }
      } catch (e) {
        if (memoryStore.getByBlNumber(cleanBl)) {
          return res.status(400).json({ success: false, message: `BL Number ${cleanBl} already exists.` });
        }
      }
    } else {
      if (memoryStore.getByBlNumber(cleanBl)) {
        return res.status(400).json({ success: false, message: `BL Number ${cleanBl} already exists.` });
      }
    }

    // Default milestones with FALSE completion initially
    const newShipmentData = {
      blNumber: cleanBl,
      jobNumber: jobNumber || '5104-2608-0002',
      freightType: freightType || 'Ocean',
      loadType: loadType || 'LCL',
      containers: containers || '-',
      carrier: carrier || '-',
      bookingNumber: bookingNumber || `BKG-${cleanBl}`,
      blType: blType || 'Original',
      commodityType: commodityType || 'General Cargo',
      commodityDescription: commodityDescription || 'MOULDHOLDER',
      customerRefNumber: customerRefNumber || '-',
      poNumber: poNumber || '-',
      tracking: {
        loading: {
          location: tracking?.loading?.location || 'CNSHA, Shanghai',
          label: 'Port of Loading',
          initialEta: null,
          actualArrivalDate: null,
          completed: false,
          completedAt: null
        },
        discharge: {
          location: tracking?.discharge?.location || 'INPPV, Port Pipavav',
          label: 'Port of Discharge',
          initialEta: tracking?.discharge?.initialEta ? new Date(tracking.discharge.initialEta) : new Date('2026-09-25'),
          actualArrivalDate: null,
          completed: false,
          completedAt: null
        },
        delivery: {
          location: tracking?.delivery?.location || 'INPPG, Patparganj',
          label: 'Place of Carrier Delivery',
          initialEta: tracking?.delivery?.initialEta ? new Date(tracking.delivery.initialEta) : new Date('2026-09-30'),
          actualArrivalDate: null,
          completed: false,
          completedAt: null
        }
      }
    };

    let createdShipment = null;
    if (!global.USE_IN_MEMORY_DB) {
      try {
        createdShipment = await Shipment.create(newShipmentData);
      } catch (e) {
        createdShipment = memoryStore.create(newShipmentData);
      }
    } else {
      createdShipment = memoryStore.create(newShipmentData);
    }

    return res.status(201).json({
      success: true,
      message: 'Shipment created successfully.',
      shipment: createdShipment
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message || 'Error creating shipment.' });
  }
};

// Admin: Get single shipment
export const getShipmentById = async (req, res) => {
  try {
    const { id } = req.params;
    let shipment = null;

    if (!global.USE_IN_MEMORY_DB) {
      try {
        shipment = await Shipment.findById(id).lean() || await Shipment.findOne({ blNumber: String(id).toUpperCase() }).lean();
      } catch (e) {
        shipment = memoryStore.getById(id) || memoryStore.getByBlNumber(id);
      }
    } else {
      shipment = memoryStore.getById(id) || memoryStore.getByBlNumber(id);
    }

    if (!shipment) {
      return res.status(404).json({ success: false, message: 'Shipment not found' });
    }

    return res.json({ success: true, shipment });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Error retrieving shipment.' });
  }
};

// Admin: Update general shipment info
export const updateShipment = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    let updatedShipment = null;

    if (!global.USE_IN_MEMORY_DB) {
      try {
        updatedShipment = await Shipment.findByIdAndUpdate(
          id,
          { $set: { ...updates, updatedAt: new Date() } },
          { new: true, runValidators: true }
        ).lean();
      } catch (e) {
        updatedShipment = memoryStore.update(id, updates);
      }
    } else {
      updatedShipment = memoryStore.update(id, updates);
    }

    if (!updatedShipment) {
      return res.status(404).json({ success: false, message: 'Shipment not found' });
    }

    return res.json({
      success: true,
      message: 'Shipment updated successfully.',
      shipment: updatedShipment
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Error updating shipment.' });
  }
};

// Admin: Update specific milestone (loading, discharge, delivery)
export const updateMilestone = async (req, res) => {
  try {
    const { id, milestone } = req.params; // milestone = 'loading' | 'discharge' | 'delivery'
    const { location, initialEta, actualArrivalDate, completed } = req.body;

    if (!['loading', 'discharge', 'delivery'].includes(milestone)) {
      return res.status(400).json({ success: false, message: 'Invalid milestone key.' });
    }

    let shipment = null;
    if (!global.USE_IN_MEMORY_DB) {
      try {
        shipment = await Shipment.findById(id);
      } catch (e) {
        shipment = memoryStore.getById(id);
      }
    } else {
      shipment = memoryStore.getById(id);
    }

    if (!shipment) {
      return res.status(404).json({ success: false, message: 'Shipment not found' });
    }

    const currentTracking = shipment.tracking || {};
    const isMarkingCompleted = Boolean(completed);

    // -------------------------------------------------------------
    // SEQUENTIAL COMPLETION DEPENDENCY RULES
    // -------------------------------------------------------------
    if (isMarkingCompleted) {
      // Validation 1: actualArrivalDate is required when completing
      if (!actualArrivalDate || !String(actualArrivalDate).trim()) {
        return res.status(400).json({
          success: false,
          message: 'Actual date is required when marking a location as reached.'
        });
      }

      // Validation 2: Cannot mark Discharge (Step 2) unless Loading (Step 1) is completed
      if (milestone === 'discharge' && !currentTracking.loading?.completed) {
        return res.status(400).json({
          success: false,
          message: 'Cannot mark Port of Discharge (Step 2) as reached until Port of Loading (Step 1) is marked as reached.'
        });
      }

      // Validation 3: Cannot mark Delivery (Step 3) unless Discharge (Step 2) is completed
      if (milestone === 'delivery' && !currentTracking.discharge?.completed) {
        return res.status(400).json({
          success: false,
          message: 'Cannot mark Place of Carrier Delivery (Step 3) as reached until Port of Discharge (Step 2) is marked as reached.'
        });
      }
    } else {
      // -------------------------------------------------------------
      // SEQUENTIAL UNMARKING DEPENDENCY RULES
      // -------------------------------------------------------------
      // Cannot unmark Loading (Step 1) if Discharge (Step 2) is still completed
      if (milestone === 'loading' && currentTracking.discharge?.completed) {
        return res.status(400).json({
          success: false,
          message: 'Cannot unmark Port of Loading (Step 1) while Port of Discharge (Step 2) is still marked as reached. Please unmark Step 2 first.'
        });
      }

      // Cannot unmark Discharge (Step 2) if Delivery (Step 3) is still completed
      if (milestone === 'discharge' && currentTracking.delivery?.completed) {
        return res.status(400).json({
          success: false,
          message: 'Cannot unmark Port of Discharge (Step 2) while Place of Carrier Delivery (Step 3) is still marked as reached. Please unmark Step 3 first.'
        });
      }
    }

    const currentMilestone = currentTracking[milestone] || {};

    const updatedMilestone = {
      ...currentMilestone,
      location: location !== undefined ? location : currentMilestone.location,
      initialEta: initialEta !== undefined ? (initialEta ? new Date(initialEta) : currentMilestone.initialEta) : currentMilestone.initialEta,
      completed: isMarkingCompleted,
      actualArrivalDate: isMarkingCompleted ? new Date(actualArrivalDate) : null,
      completedAt: isMarkingCompleted ? (currentMilestone.completedAt || new Date()) : null
    };

    const trackingUpdate = {
      ...currentTracking,
      [milestone]: updatedMilestone
    };

    let updatedShipment = null;

    if (!global.USE_IN_MEMORY_DB && shipment.save) {
      shipment.tracking = trackingUpdate;
      shipment.updatedAt = new Date();
      shipment.markModified('tracking');
      await shipment.save();
      updatedShipment = shipment.toObject();
    } else {
      updatedShipment = memoryStore.update(id, { tracking: trackingUpdate });
    }

    return res.json({
      success: true,
      message: `${milestone} milestone updated successfully.`,
      shipment: updatedShipment
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message || 'Error updating milestone.' });
  }
};
