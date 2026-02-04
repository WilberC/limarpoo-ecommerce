import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-content-editor',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './content-editor.html',
  styleUrl: './content-editor.scss',
})
export class ContentEditorComponent {}
