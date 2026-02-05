import { PrismaClient, Order } from "@prisma/client";

const prisma = new PrismaClient();

interface CreateOrderData {
  user_id: string;
  shipping_address_id: string;
  items: { product_id: string; quantity: number }[];
}

export class OrderService {
  async getAllOrders(): Promise<Order[]> {
    return prisma.order.findMany({
      include: {
        items: true,
        user: true,
      },
    });
  }

  async getOrderById(id: string): Promise<Order | null> {
    return prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        user: true,
        shipping_address: true,
        payment: true,
      },
    });
  }

  async getUserOrders(userId: string): Promise<Order[]> {
    return prisma.order.findMany({
      where: { user_id: userId },
      include: {
        items: true,
      },
    });
  }

  async createOrder(data: CreateOrderData): Promise<Order> {
    const { user_id, shipping_address_id, items } = data;

    // Fetch products to get current prices
    const productIds = items.map((item) => item.product_id);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    if (products.length !== items.length) {
      throw new Error("One or more products not found");
    }

    // Calculate total and prepare items
    let totalAmount = 0;
    const orderItemsData = items.map((item) => {
      const product = products.find((p) => p.id === item.product_id);
      if (!product) throw new Error(`Product ${item.product_id} not found`); // Should not happen

      const itemTotal = Number(product.price) * item.quantity;
      totalAmount += itemTotal;

      return {
        product_id: item.product_id,
        quantity: item.quantity,
        price_at_purchase: product.price,
      };
    });

    return prisma.order.create({
      data: {
        user_id,
        shipping_address_id,
        total_amount: totalAmount,
        status: "PENDING",
        items: {
          create: orderItemsData,
        },
      },
      include: {
        items: true,
      },
    });
  }
}
