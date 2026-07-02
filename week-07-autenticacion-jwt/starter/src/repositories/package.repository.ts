import { PackageModel, IPackage } from '../models/package.model';
import { CreatePackageDto, UpdatePackageDto } from '../schemas/package.schema';

export async function findAll(): Promise<IPackage[]> {
  return PackageModel.find().sort({ createdAt: -1 });
}

export async function findById(id: string): Promise<IPackage | null> {
  return PackageModel.findById(id);
}

export async function create(
  data: CreatePackageDto & { createdBy: string }
): Promise<IPackage> {
  return PackageModel.create(data);
}

export async function updateById(
  id: string,
  data: UpdatePackageDto
): Promise<IPackage | null> {
  return PackageModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
}

export async function deleteById(id: string): Promise<boolean> {
  const result = await PackageModel.findByIdAndDelete(id);
  return result !== null;
}
