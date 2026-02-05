import { PrismaClient, CustomerProfile } from "@prisma/client";

const prisma = new PrismaClient();

export class CustomerProfileService {
  async getAllProfiles(): Promise<CustomerProfile[]> {
    return prisma.customerProfile.findMany({
      include: { user: true },
    });
  }

  async getProfileById(id: string): Promise<CustomerProfile | null> {
    return prisma.customerProfile.findUnique({
      where: { id },
      include: { user: true },
    });
  }

  async getProfileByUserId(userId: string): Promise<CustomerProfile | null> {
    return prisma.customerProfile.findUnique({
      where: { user_id: userId },
    });
  }

  async createProfile(
    data: Omit<CustomerProfile, "id">,
  ): Promise<CustomerProfile> {
    return prisma.customerProfile.create({
      data,
    });
  }

  async updateProfile(
    id: string,
    data: Partial<CustomerProfile>,
  ): Promise<CustomerProfile> {
    return prisma.customerProfile.update({
      where: { id },
      data,
    });
  }

  async deleteProfile(id: string): Promise<CustomerProfile> {
    return prisma.customerProfile.delete({
      where: { id },
    });
  }
}
