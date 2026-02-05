import { PrismaClient, Article } from "@prisma/client";

const prisma = new PrismaClient();

export class ArticleService {
  async getAllArticles(): Promise<Article[]> {
    return prisma.article.findMany({
      include: { author: true },
    });
  }

  async getArticleById(id: string): Promise<Article | null> {
    return prisma.article.findUnique({
      where: { id },
      include: { author: true },
    });
  }

  async createArticle(
    data: Omit<Article, "id" | "published_at">,
  ): Promise<Article> {
    return prisma.article.create({
      data,
    });
  }

  async updateArticle(id: string, data: Partial<Article>): Promise<Article> {
    return prisma.article.update({
      where: { id },
      data,
    });
  }

  async deleteArticle(id: string): Promise<Article> {
    return prisma.article.delete({
      where: { id },
    });
  }
}
