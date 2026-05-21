import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env['DATABASE_URL'] });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main(): Promise<void> {
  console.log('🌱 Iniciando seed...');

  await prisma.package.deleteMany();
  await prisma.customer.deleteMany();

  const customers = await Promise.all([
    prisma.customer.create({
      data: { name: 'Carlos Mendez', email: 'carlos@email.com', phone: '3001234567', address: 'Calle 10 #5-20, Bogotá' },
    }),
    prisma.customer.create({
      data: { name: 'Laura Gómez', email: 'laura@email.com', phone: '3109876543', address: 'Av. Siempreviva 742, Medellín' },
    }),
    prisma.customer.create({
      data: { name: 'Andrés Torres', email: 'andres@email.com', phone: '3205551234', address: 'Carrera 15 #80-40, Cali' },
    }),
  ]);

  const result = await prisma.package.createMany({
    data: [
      { trackingCode: 'PKG-001', description: 'Electrónica - Laptop', weight: 2.5, status: 'IN_TRANSIT', origin: 'Bogotá', destination: 'Medellín', customerId: customers[0].id },
      { trackingCode: 'PKG-002', description: 'Ropa deportiva', weight: 0.8, status: 'PENDING', origin: 'Cali', destination: 'Bogotá', customerId: customers[1].id },
      { trackingCode: 'PKG-003', description: 'Libros universitarios', weight: 3.2, status: 'DELIVERED', origin: 'Medellín', destination: 'Cali', customerId: customers[2].id },
      { trackingCode: 'PKG-004', description: 'Repuestos automotriz', weight: 5.0, status: 'PENDING', origin: 'Bogotá', destination: 'Barranquilla', customerId: customers[0].id },
      { trackingCode: 'PKG-005', description: 'Medicamentos', weight: 0.5, status: 'IN_TRANSIT', origin: 'Bucaramanga', destination: 'Bogotá', customerId: customers[1].id },
      { trackingCode: 'PKG-006', description: 'Juguetes', weight: 1.2, status: 'RETURNED', origin: 'Bogotá', destination: 'Cartagena', customerId: customers[2].id },
    ],
  });

  console.log(`✅ ${customers.length} clientes creados`);
  console.log(`✅ ${result.count} paquetes creados`);
}

main()
  .catch((err: unknown) => {
    console.error('❌ Error en seed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
