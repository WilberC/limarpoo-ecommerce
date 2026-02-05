import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../../../../core/services/article.service';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastService } from '../../../../core/services/toast.service';
import { Article } from '../../../../core/models/article.model';

@Component({
  selector: 'app-content-editor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './content-editor.html',
  styleUrl: './content-editor.scss',
})
export class ContentEditorComponent implements OnInit {
  articleForm: FormGroup;
  loading = false;
  saving = false;
  error: string | null = null;
  isEditMode = false;
  articleId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private authService: AuthService,
    private toastService: ToastService
  ) {
    this.articleForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngOnInit(): void {
    this.articleId = this.route.snapshot.paramMap.get('id');
    if (this.articleId && this.articleId !== 'new') {
      this.isEditMode = true;
      this.loadArticle(this.articleId);
    }
  }

  loadArticle(id: string): void {
    this.loading = true;
    this.error = null;

    this.articleService.getArticleById(id).subscribe({
      next: (article) => {
        this.articleForm.patchValue({
          title: article.title,
          content: article.content,
        });
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load article';
        this.loading = false;
      },
    });
  }

  onSubmit(): void {
    if (this.articleForm.invalid) {
      this.toastService.error('Please fill in all required fields');
      return;
    }

    this.saving = true;
    const currentUser = this.authService.getCurrentUser();
    const articleData = {
      ...this.articleForm.value,
      author_id: currentUser?.id,
      published_at: new Date(),
    };

    const request = this.isEditMode && this.articleId
      ? this.articleService.updateArticle(this.articleId, articleData)
      : this.articleService.createArticle(articleData);

    request.subscribe({
      next: () => {
        this.saving = false;
        const action = this.isEditMode ? 'updated' : 'created';
        this.toastService.success(`Article ${action} successfully`);
        this.router.navigate(['/content']);
      },
      error: (err) => {
        this.saving = false;
        // Error handled by interceptor
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/content']);
  }
}
