import 'dotenv/config';
import { connectDB, disconnectDB } from './lib/mongoose';
import { Secondary } from './models/secondary.model';
import { Primary } from './models/primary.model';

async function seed(): Promise<void> {
  await connectDB();

  await Primary.deleteMany({});
  await Secondary.deleteMany({});
  console.log('Collections cleared');

  const [ana, carlos, maria] = await Secondary.insertMany([
    { name: 'Ana García',   email: 'ana.garcia@email.com',   phone: '+51 987 654 321', address: 'Av. Larco 123, Miraflores, Lima' },
    { name: 'Carlos López', email: 'carlos.lopez@email.com', phone: '+51 976 543 210', address: 'Jr. Cusco 456, Centro, Arequipa' },
    { name: 'María Torres', email: 'maria.torres@email.com', phone: '+51 965 432 109', address: 'Calle Real 789, Trujillo' },
  ]);
  console.log('Customers inserted');

  await Primary.insertMany([
    { trackingCode: 'PKG-2024-001', description: 'Laptop Dell XPS',       weightKg: 2.5,  status: 'delivered',  customer: ana._id },
    { trackingCode: 'PKG-2024-002', description: 'Documentos legales',    weightKg: 0.3,  status: 'in_transit', customer: ana._id },
    { trackingCode: 'PKG-2024-003', description: 'Zapatillas Nike',       weightKg: 1.2,  status: 'pending',    customer: carlos._id },
    { trackingCode: 'PKG-2024-004', description: 'Smartphone Samsung',    weightKg: 0.8,  status: 'in_transit', customer: carlos._id },
    { trackingCode: 'PKG-2024-005', description: 'Libros universitarios', weightKg: 4.0,  status: 'pending',    customer: maria._id },
    { trackingCode: 'PKG-2024-006', description: 'Ropa de temporada',     weightKg: 3.5,  status: 'returned',   customer: maria._id },
  ]);
  console.log('Packages inserted');

  console.log('Seed completed successfully');
  await disconnectDB();
}

seed().catch((err: unknown) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
