import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ArticleService } from '../../../../core/services/article.service';
import { ToastService } from '../../../../core/services/toast.service';
import { Article } from '../../../../core/models/article.model';

@Component({
  selector: 'app-content-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './content-dashboard.html',
  styleUrl: './content-dashboard.scss',
})
export class ContentDashboardComponent implements OnInit {
  articles: Article[] = [];
  loading = false;
  error: string | null = null;
  deletingId: string | null = null;

  constructor(
    private articleService: ArticleService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.loading = true;
    this.error = null;

    this.articleService.getAllArticles().subscribe({
      next: (articles) => {
        this.articles = articles;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load articles';
        this.loading = false;
      },
    });
  }

  deleteArticle(id: string): void {
    if (confirm('Are you sure you want to delete this article?')) {
      this.deletingId = id;
      this.articleService.deleteArticle(id).subscribe({
        next: () => {
          this.toastService.success('Article deleted successfully');
          this.loadArticles();
          this.deletingId = null;
        },
        error: () => {
          this.deletingId = null;
        },
      });
    }
  }
}
