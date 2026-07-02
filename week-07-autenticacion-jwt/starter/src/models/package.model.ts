import mongoose, { Document, Schema } from 'mongoose';

export type PackageStatus = 'pending' | 'in_transit' | 'delivered' | 'cancelled';

export interface IPackage extends Document {
  trackingCode: string;
  customerName: string;
  originAddress: string;
  destinationAddress: string;
  weightKg: number;
  status: PackageStatus;
  driverName?: string;
  route?: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const packageSchema = new Schema<IPackage>(
  {
    trackingCode: {
      type: String,
      required: [true, 'El código de rastreo es requerido'],
      unique: true,
      trim: true,
    },
    customerName: {
      type: String,
      required: [true, 'El nombre del cliente es requerido'],
      trim: true,
    },
    originAddress: {
      type: String,
      required: [true, 'La dirección de origen es requerida'],
      trim: true,
    },
    destinationAddress: {
      type: String,
      required: [true, 'La dirección de destino es requerida'],
      trim: true,
    },
    weightKg: {
      type: Number,
      required: [true, 'El peso es requerido'],
      min: [0.01, 'El peso debe ser mayor a 0'],
    },
    status: {
      type: String,
      enum: ['pending', 'in_transit', 'delivered', 'cancelled'],
      default: 'pending',
    },
    driverName: {
      type: String,
      trim: true,
    },
    route: {
      type: String,
      trim: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export const PackageModel = mongoose.model<IPackage>('Package', packageSchema);
