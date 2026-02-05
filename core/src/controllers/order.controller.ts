import { Request, Response } from "express";
import { OrderService } from "../services/order.service";

const orderService = new OrderService();

export class OrderController {
  async getAllOrders(req: Request, res: Response) {
    try {
      const orders = await orderService.getAllOrders();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getOrderById(req: Request, res: Response) {
    try {
      const order = await orderService.getOrderById(req.params.id as string);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getUserOrders(req: Request, res: Response) {
    try {
      const orders = await orderService.getUserOrders(
        req.params.userId as string,
      );
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async createOrder(req: Request, res: Response) {
    try {
      const order = await orderService.createOrder(req.body);
      res.status(201).json(order);
    } catch (error: any) {
      if (error.message === "One or more products not found") {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  }
}
