import { prisma } from '../lib/prisma';
import { AppError } from '../errors/AppError';
import type { CreatePackageDto, UpdatePackageDto } from '../schemas/items.schema';

function isPrismaError(err: unknown, code: string): boolean {
  return (
    typeof err === 'object' &&
    err !== null &&
    'code' in err &&
    (err as { code: string }).code === code
  );
}

export async function findAll(page: number, limit: number) {
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    prisma.package.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: { customer: true },
    }),
    prisma.package.count(),
  ]);

  return { data, total, page, limit };
}

export async function findById(id: number) {
  return prisma.package.findUnique({
    where: { id },
    include: { customer: true },
  });
}

export async function create(data: CreatePackageDto) {
  try {
    return await prisma.package.create({ data });
  } catch (err) {
    if (isPrismaError(err, 'P2002')) {
      throw new AppError(409, 'Ya existe un paquete con ese código de rastreo');
    }
    throw err;
  }
}

export async function update(id: number, data: UpdatePackageDto) {
  try {
    return await prisma.package.update({ where: { id }, data });
  } catch (err) {
    if (isPrismaError(err, 'P2025')) {
      throw new AppError(404, 'Paquete no encontrado');
    }
    throw err;
  }
}

export async function remove(id: number): Promise<void> {
  try {
    await prisma.package.delete({ where: { id } });
  } catch (err) {
    if (isPrismaError(err, 'P2025')) {
      throw new AppError(404, 'Paquete no encontrado');
    }
    throw err;
  }
}
