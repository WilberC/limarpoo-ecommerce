import { Request, Response } from "express";
import { ReviewService } from "../services/review.service";

const reviewService = new ReviewService();

export class ReviewController {
  async getAllReviews(req: Request, res: Response) {
    try {
      const reviews = await reviewService.getAllReviews();
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getReviewById(req: Request, res: Response) {
    try {
      const review = await reviewService.getReviewById(req.params.id as string);
      if (!review) {
        return res.status(404).json({ error: "Review not found" });
      }
      res.json(review);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async createReview(req: Request, res: Response) {
    try {
      const review = await reviewService.createReview(req.body);
      res.status(201).json(review);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateReview(req: Request, res: Response) {
    try {
      const review = await reviewService.updateReview(
        req.params.id as string,
        req.body,
      );
      res.json(review);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteReview(req: Request, res: Response) {
    try {
      await reviewService.deleteReview(req.params.id as string);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getProductReviews(req: Request, res: Response) {
    try {
      const reviews = await reviewService.getProductReviews(
        req.params.productId as string,
      );
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
