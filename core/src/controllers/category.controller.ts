import { Request, Response } from "express";
import { CategoryService } from "../services/category.service";

const categoryService = new CategoryService();

export class CategoryController {
  async getAllCategories(req: Request, res: Response) {
    try {
      const categories = await categoryService.getAllCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getCategoryById(req: Request, res: Response) {
    try {
      const category = await categoryService.getCategoryById(
        req.params.id as string,
      );
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async createCategory(req: Request, res: Response) {
    try {
      const category = await categoryService.createCategory(req.body);
      res.status(201).json(category);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateCategory(req: Request, res: Response) {
    try {
      const category = await categoryService.updateCategory(
        req.params.id as string,
        req.body,
      );
      res.json(category);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteCategory(req: Request, res: Response) {
    try {
      await categoryService.deleteCategory(req.params.id as string);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
