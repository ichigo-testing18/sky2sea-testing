// In-memory storage helper ensuring 100% server uptime even without MongoDB installed

export const sampleShipments = [
  {
    blNumber: "HGCK260793637",
    jobNumber: "5104-2608-0002",
    freightType: "Ocean",
    loadType: "LCL",
    containers: "-",
    carrier: "-",
    bookingNumber: "BKG5104-2608-0002",
    blType: "Original",
    commodityType: "General Cargo",
    commodityDescription: "MOULDHOLDER HS CODE:84802000",
    customerRefNumber: "260722MSGY",
    poNumber: "260722MSGY",
    tracking: {
      loading: {
        location: "CNSHA, Shanghai",
        label: "Port of Loading",
        initialEta: null,
        actualArrivalDate: null,
        completed: false,
        completedAt: null
      },
      discharge: {
        location: "INPPV, Port Pipavav",
        label: "Port of Discharge",
        initialEta: new Date("2026-09-25"),
        actualArrivalDate: null,
        completed: false,
        completedAt: null
      },
      delivery: {
        location: "INPPG, Patparganj",
        label: "Place of Carrier Delivery",
        initialEta: new Date("2026-09-30"),
        actualArrivalDate: null,
        completed: false,
        completedAt: null
      }
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const memoryStore = {
  shipments: [...sampleShipments.map((s, idx) => ({ ...s, _id: `mem_shipment_${idx + 1}` }))],

  getAll() {
    return this.shipments;
  },

  getByBlNumber(bl) {
    if (!bl) return null;
    const cleanBl = String(bl).trim().toUpperCase();
    return this.shipments.find(s => s.blNumber.toUpperCase() === cleanBl) || null;
  },

  getById(id) {
    return this.shipments.find(s => String(s._id) === String(id)) || null;
  },

  create(data) {
    const cleanBl = String(data.blNumber).trim().toUpperCase();
    if (this.getByBlNumber(cleanBl)) {
      throw new Error(`BL Number ${cleanBl} already exists.`);
    }

    const newShipment = {
      _id: `mem_shipment_${Date.now()}`,
      blNumber: cleanBl,
      jobNumber: data.jobNumber || '-',
      freightType: data.freightType || 'Ocean',
      loadType: data.loadType || 'LCL',
      containers: data.containers || '-',
      carrier: data.carrier || '-',
      bookingNumber: data.bookingNumber || '-',
      blType: data.blType || 'Original',
      commodityType: data.commodityType || 'General Cargo',
      commodityDescription: data.commodityDescription || '-',
      customerRefNumber: data.customerRefNumber || '-',
      poNumber: data.poNumber || '-',
      tracking: {
        loading: {
          location: data.tracking?.loading?.location || 'CNSHA, Shanghai',
          label: 'Port of Loading',
          initialEta: null,
          actualArrivalDate: null,
          completed: false,
          completedAt: null
        },
        discharge: {
          location: data.tracking?.discharge?.location || 'INPPV, Port Pipavav',
          label: 'Port of Discharge',
          initialEta: data.tracking?.discharge?.initialEta || new Date('2026-09-25'),
          actualArrivalDate: null,
          completed: false,
          completedAt: null
        },
        delivery: {
          location: data.tracking?.delivery?.location || 'INPPG, Patparganj',
          label: 'Place of Carrier Delivery',
          initialEta: data.tracking?.delivery?.initialEta || new Date('2026-09-30'),
          actualArrivalDate: null,
          completed: false,
          completedAt: null
        }
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.shipments.unshift(newShipment);
    return newShipment;
  },

  update(id, updates) {
    const index = this.shipments.findIndex(s => String(s._id) === String(id));
    if (index === -1) return null;

    const current = this.shipments[index];
    const updated = {
      ...current,
      ...updates,
      tracking: {
        ...current.tracking,
        ...(updates.tracking || {})
      },
      updatedAt: new Date().toISOString()
    };

    this.shipments[index] = updated;
    return updated;
  }
};
