import { PrismaClient, Review } from "@prisma/client";

const prisma = new PrismaClient();

export class ReviewService {
  async getAllReviews(): Promise<Review[]> {
    return prisma.review.findMany({
      include: { user: true, product: true },
    });
  }

  async getReviewById(id: string): Promise<Review | null> {
    return prisma.review.findUnique({
      where: { id },
      include: { user: true, product: true },
    });
  }

  async createReview(data: Omit<Review, "id" | "created_at">): Promise<Review> {
    return prisma.review.create({
      data,
    });
  }

  async updateReview(id: string, data: Partial<Review>): Promise<Review> {
    return prisma.review.update({
      where: { id },
      data,
    });
  }

  async deleteReview(id: string): Promise<Review> {
    return prisma.review.delete({
      where: { id },
    });
  }

  async getProductReviews(productId: string): Promise<Review[]> {
    return prisma.review.findMany({
      where: { product_id: productId },
      include: { user: true },
    });
  }
}
