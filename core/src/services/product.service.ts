import { PrismaClient, Product } from "@prisma/client";

const prisma = new PrismaClient();

export class ProductService {
  async getAllProducts(): Promise<Product[]> {
    return prisma.product.findMany({
      include: {
        category: true,
      },
    });
  }

  async getProductById(id: string): Promise<Product | null> {
    return prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        items: true,
        reviews: true,
      },
    });
  }

  async createProduct(data: {
    name: string;
    description: string;
    price: number;
    sku: string;
    stock_quantity: number;
    category_id: string;
  }): Promise<Product> {
    return prisma.product.create({
      data,
    });
  }

  async updateProduct(
    id: string,
    data: {
      name?: string;
      description?: string;
      price?: number;
      sku?: string;
      stock_quantity?: number;
      category_id?: string;
    },
  ): Promise<Product> {
    return prisma.product.update({
      where: { id },
      data,
    });
  }

  async deleteProduct(id: string): Promise<Product> {
    return prisma.product.delete({
      where: { id },
    });
  }
}
