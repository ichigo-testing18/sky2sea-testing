import mongoose from 'mongoose';

const MilestoneSchema = new mongoose.Schema({
  location: { type: String, required: true },
  label: { type: String, required: true },
  initialEta: { type: Date, default: null },
  actualArrivalDate: { type: Date, default: null },
  completed: { type: Boolean, default: false },
  completedAt: { type: Date, default: null }
}, { _id: false });

const ShipmentSchema = new mongoose.Schema({
  blNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true,
    index: true
  },
  jobNumber: { type: String, required: true, trim: true },
  freightType: { type: String, default: 'Ocean', trim: true },
  loadType: { type: String, default: 'LCL', trim: true },
  containers: { type: String, default: '-', trim: true },
  carrier: { type: String, default: '-', trim: true },
  bookingNumber: { type: String, required: true, trim: true },
  blType: { type: String, default: 'Original', trim: true },
  commodityType: { type: String, default: 'General Cargo', trim: true },
  commodityDescription: { type: String, default: 'MOULDHOLDER', trim: true },
  customerRefNumber: { type: String, default: '-', trim: true },
  poNumber: { type: String, default: '-', trim: true },
  
  tracking: {
    loading: {
      type: MilestoneSchema,
      default: () => ({
        location: 'CNSHA, Shanghai',
        label: 'Port of Loading',
        initialEta: null,
        actualArrivalDate: null,
        completed: false,
        completedAt: null
      })
    },
    discharge: {
      type: MilestoneSchema,
      default: () => ({
        location: 'INPPV, Port Pipavav',
        label: 'Port of Discharge',
        initialEta: new Date('2026-09-25'),
        actualArrivalDate: null,
        completed: false,
        completedAt: null
      })
    },
    delivery: {
      type: MilestoneSchema,
      default: () => ({
        location: 'INPPG, Patparganj',
        label: 'Place of Carrier Delivery',
        initialEta: new Date('2026-09-30'),
        actualArrivalDate: null,
        completed: false,
        completedAt: null
      })
    }
  }
}, {
  timestamps: true
});

export const Shipment = mongoose.model('Shipment', ShipmentSchema);
