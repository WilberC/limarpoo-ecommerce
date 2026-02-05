import { PrismaClient, Category } from "@prisma/client";

const prisma = new PrismaClient();

export class CategoryService {
  async getAllCategories(): Promise<Category[]> {
    return prisma.category.findMany({
      include: {
        children: true,
      },
    });
  }

  async getCategoryById(id: string): Promise<Category | null> {
    return prisma.category.findUnique({
      where: { id },
      include: {
        children: true,
        parent: true,
      },
    });
  }

  async createCategory(data: {
    name: string;
    parent_id?: string;
  }): Promise<Category> {
    return prisma.category.create({
      data,
    });
  }

  async updateCategory(
    id: string,
    data: { name?: string; parent_id?: string },
  ): Promise<Category> {
    return prisma.category.update({
      where: { id },
      data,
    });
  }

  async deleteCategory(id: string): Promise<Category> {
    return prisma.category.delete({
      where: { id },
    });
  }
}
