import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { finalize } from 'rxjs/operators';
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
    private toastService: ToastService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.loading = true;
    this.error = null;
    this.cdr.detectChanges();

    this.articleService
      .getAllArticles()
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        }),
      )
      .subscribe({
        next: (articles) => {
          this.articles = articles;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error loading articles:', err);
          this.error = 'Failed to load articles';
          this.cdr.detectChanges();
        },
      });
  }

  deleteArticle(id: string): void {
    if (confirm('Are you sure you want to delete this article?')) {
      this.deletingId = id;
      this.cdr.detectChanges();

      this.articleService
        .deleteArticle(id)
        .pipe(
          finalize(() => {
            this.deletingId = null;
            this.cdr.detectChanges();
          }),
        )
        .subscribe({
          next: () => {
            this.toastService.success('Article deleted successfully');
            this.loadArticles();
          },
          error: (err) => {
            console.error('Error deleting article:', err);
            this.cdr.detectChanges();
          },
        });
    }
  }
}
