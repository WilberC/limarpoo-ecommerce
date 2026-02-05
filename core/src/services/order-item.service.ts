import { PrismaClient, OrderItem } from "@prisma/client";

const prisma = new PrismaClient();

export class OrderItemService {
  async getAllOrderItems(): Promise<OrderItem[]> {
    return prisma.orderItem.findMany({
      include: { product: true },
    });
  }

  async getOrderItemById(id: string): Promise<OrderItem | null> {
    return prisma.orderItem.findUnique({
      where: { id },
      include: { product: true },
    });
  }

  async getOrderItemsByOrderId(orderId: string): Promise<OrderItem[]> {
    return prisma.orderItem.findMany({
      where: { order_id: orderId },
      include: { product: true },
    });
  }

  // Creating order items usually happens via Order creation, but supporting standalone creation if needed
  async createOrderItem(data: Omit<OrderItem, "id">): Promise<OrderItem> {
    return prisma.orderItem.create({
      data,
    });
  }

  async updateOrderItem(
    id: string,
    data: Partial<OrderItem>,
  ): Promise<OrderItem> {
    return prisma.orderItem.update({
      where: { id },
      data,
    });
  }

  async deleteOrderItem(id: string): Promise<OrderItem> {
    return prisma.orderItem.delete({
      where: { id },
    });
  }
}
