import { Request, Response } from "express";
import { ProductService } from "../services/product.service";

const productService = new ProductService();

export class ProductController {
  async getAllProducts(req: Request, res: Response) {
    try {
      const products = await productService.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getProductById(req: Request, res: Response) {
    try {
      const product = await productService.getProductById(
        req.params.id as string,
      );
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async createProduct(req: Request, res: Response) {
    try {
      const product = await productService.createProduct(req.body);
      res.status(201).json(product);
    } catch (error: any) {
      if (error.code === "P2002") {
        // Unique constraint violation (SKU)
        res.status(409).json({ error: "Product with this SKU already exists" });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  }

  async updateProduct(req: Request, res: Response) {
    try {
      const product = await productService.updateProduct(
        req.params.id as string,
        req.body,
      );
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteProduct(req: Request, res: Response) {
    try {
      await productService.deleteProduct(req.params.id as string);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
