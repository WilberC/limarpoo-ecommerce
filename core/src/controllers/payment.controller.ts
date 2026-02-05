import { Request, Response } from "express";
import { PaymentService } from "../services/payment.service";

const paymentService = new PaymentService();

export class PaymentController {
  async createPayment(req: Request, res: Response) {
    try {
      const payment = await paymentService.createPayment(req.body);
      res.status(201).json(payment);
    } catch (error: any) {
      if (
        error.message === "Order not found" ||
        error.message === "Order is already paid"
      ) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  }

  async getPaymentById(req: Request, res: Response) {
    try {
      const payment = await paymentService.getPaymentById(
        req.params.id as string,
      );
      if (!payment) {
        return res.status(404).json({ error: "Payment not found" });
      }
      res.json(payment);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
