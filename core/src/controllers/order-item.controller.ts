import { Request, Response } from "express";
import { OrderItemService } from "../services/order-item.service";

const orderItemService = new OrderItemService();

export class OrderItemController {
  async getAllOrderItems(req: Request, res: Response) {
    try {
      const orderItems = await orderItemService.getAllOrderItems();
      res.json(orderItems);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getOrderItemById(req: Request, res: Response) {
    try {
      const orderItem = await orderItemService.getOrderItemById(
        req.params.id as string,
      );
      if (!orderItem) {
        return res.status(404).json({ error: "Order item not found" });
      }
      res.json(orderItem);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getOrderItemsByOrderId(req: Request, res: Response) {
    try {
      const orderItems = await orderItemService.getOrderItemsByOrderId(
        req.params.orderId as string,
      );
      res.json(orderItems);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async createOrderItem(req: Request, res: Response) {
    try {
      const orderItem = await orderItemService.createOrderItem(req.body);
      res.status(201).json(orderItem);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateOrderItem(req: Request, res: Response) {
    try {
      const orderItem = await orderItemService.updateOrderItem(
        req.params.id as string,
        req.body,
      );
      res.json(orderItem);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteOrderItem(req: Request, res: Response) {
    try {
      await orderItemService.deleteOrderItem(req.params.id as string);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
