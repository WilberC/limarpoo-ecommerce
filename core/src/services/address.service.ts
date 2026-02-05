import { PrismaClient, Address } from "@prisma/client";

const prisma = new PrismaClient();

export class AddressService {
  async getAllAddresses(): Promise<Address[]> {
    return prisma.address.findMany();
  }

  async getAddressById(id: string): Promise<Address | null> {
    return prisma.address.findUnique({
      where: { id },
    });
  }

  async createAddress(data: Omit<Address, "id">): Promise<Address> {
    return prisma.address.create({
      data,
    });
  }

  async updateAddress(id: string, data: Partial<Address>): Promise<Address> {
    return prisma.address.update({
      where: { id },
      data,
    });
  }

  async deleteAddress(id: string): Promise<Address> {
    return prisma.address.delete({
      where: { id },
    });
  }

  async getUserAddresses(userId: string): Promise<Address[]> {
    return prisma.address.findMany({
      where: { user_id: userId },
    });
  }
}
