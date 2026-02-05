import {
  PrismaClient,
  Payment,
  PaymentProvider,
  OrderStatus,
} from "@prisma/client";

const prisma = new PrismaClient();

interface CreatePaymentData {
  order_id: string;
  provider: PaymentProvider;
  transaction_id: string;
  amount: number;
}

export class PaymentService {
  async createPayment(data: CreatePaymentData): Promise<Payment> {
    const { order_id, provider, transaction_id, amount } = data;

    // Check if order exists
    const order = await prisma.order.findUnique({
      where: { id: order_id },
    });

    if (!order) {
      throw new Error("Order not found");
    }

    if (order.status === OrderStatus.PAID) {
      throw new Error("Order is already paid");
    }

    // Create payment
    const payment = await prisma.payment.create({
      data: {
        order_id,
        provider,
        transaction_id,
        status: "COMPLETED", // Assuming immediate success for this iteration
        amount,
      },
    });

    // Update order status
    await prisma.order.update({
      where: { id: order_id },
      data: {
        status: OrderStatus.PAID,
      },
    });

    return payment;
  }

  async getPaymentById(id: string): Promise<Payment | null> {
    return prisma.payment.findUnique({
      where: { id },
    });
  }

  async getPaymentByOrderId(orderId: string): Promise<Payment | null> {
    return prisma.payment.findUnique({
      where: { order_id: orderId },
    });
  }
}
