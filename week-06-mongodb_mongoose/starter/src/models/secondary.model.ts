import { Schema, model } from 'mongoose';

interface ICustomer {
  name: string;
  email: string;
  phone: string;
  address: string;
}

const customerSchema = new Schema<ICustomer>(
  {
    name: {
      type: String,
      required: [true, 'El nombre es requerido'],
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, 'El email es requerido'],
      trim: true,
      lowercase: true,
      unique: true,
      maxlength: 150,
    },
    phone: {
      type: String,
      required: [true, 'El teléfono es requerido'],
      trim: true,
      maxlength: 20,
    },
    address: {
      type: String,
      required: [true, 'La dirección es requerida'],
      trim: true,
      maxlength: 255,
    },
  },
  { timestamps: true },
);

export const Secondary = model<ICustomer>('Customer', customerSchema);
