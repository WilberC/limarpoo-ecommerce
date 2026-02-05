export interface Article {
  id: string;
  title: string;
  content: string;
  author_id: string;
  published_at: Date;
  author?: {
    id: string;
    email: string;
  };
}
