import { Schema, model, Types } from 'mongoose';

export type PackageStatus = 'pending' | 'in_transit' | 'delivered' | 'returned';

interface IPackage {
  trackingCode: string;
  description: string;
  weightKg: number;
  status: PackageStatus;
  customer: Types.ObjectId;
}

const packageSchema = new Schema<IPackage>(
  {
    trackingCode: {
      type: String,
      required: [true, 'El código de seguimiento es requerido'],
      trim: true,
      unique: true,
      uppercase: true,
      maxlength: 50,
    },
    description: {
      type: String,
      required: [true, 'La descripción es requerida'],
      trim: true,
      maxlength: 300,
    },
    weightKg: {
      type: Number,
      required: [true, 'El peso es requerido'],
      min: [0.01, 'El peso debe ser mayor a 0'],
    },
    status: {
      type: String,
      enum: ['pending', 'in_transit', 'delivered', 'returned'],
      default: 'pending',
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
      required: [true, 'El cliente es requerido'],
    },
  },
  { timestamps: true },
);

export const Primary = model<IPackage>('Package', packageSchema);
