import { Request, Response } from "express";
import { ArticleService } from "../services/article.service";

const articleService = new ArticleService();

export class ArticleController {
  async getAllArticles(req: Request, res: Response) {
    try {
      const articles = await articleService.getAllArticles();
      res.json(articles);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getArticleById(req: Request, res: Response) {
    try {
      const article = await articleService.getArticleById(
        req.params.id as string,
      );
      if (!article) {
        return res.status(404).json({ error: "Article not found" });
      }
      res.json(article);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async createArticle(req: Request, res: Response) {
    try {
      const article = await articleService.createArticle(req.body);
      res.status(201).json(article);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateArticle(req: Request, res: Response) {
    try {
      const article = await articleService.updateArticle(
        req.params.id as string,
        req.body,
      );
      res.json(article);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteArticle(req: Request, res: Response) {
    try {
      await articleService.deleteArticle(req.params.id as string);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
