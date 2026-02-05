import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

export class UserService {
  async getAllUsers(): Promise<User[]> {
    return prisma.user.findMany({
      include: {
        profile: true,
      },
    });
  }

  async getUserById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
      include: {
        profile: true,
        addresses: true,
        orders: true,
      },
    });
  }

  async createUser(data: any): Promise<User> {
    const { email, password, role, firstName, lastName } = data;

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    return prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          email,
          password_hash: passwordHash,
          role: role || "CUSTOMER",
        },
      });

      if (firstName && lastName) {
        await tx.customerProfile.create({
          data: {
            user_id: newUser.id,
            first_name: firstName,
            last_name: lastName,
          },
        });
      }

      return newUser;
    });
  }

  async updateUser(id: string, data: any): Promise<User> {
    const { email, role, firstName, lastName } = data;

    return prisma.$transaction(async (tx) => {
      const updatedUser = await tx.user.update({
        where: { id },
        data: {
          email,
          role,
        },
      });

      if (firstName || lastName) {
        await tx.customerProfile.upsert({
          where: { user_id: id },
          update: {
            first_name: firstName,
            last_name: lastName,
          },
          create: {
            user_id: id,
            first_name: firstName || "",
            last_name: lastName || "",
          },
        });
      }

      return updatedUser;
    });
  }

  async deleteUser(id: string): Promise<User> {
    return prisma.user.delete({
      where: { id },
    });
  }
}
