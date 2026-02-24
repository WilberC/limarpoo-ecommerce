import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api/v1'

export interface Article {
  id: number
  title: string
  content: string
  published_at: string | null
  created_at: string
  updated_at: string
  author: {
    id: number
    email: string
    customer_profile?: {
      first_name: string
      last_name: string
    } | null
  }
}

export async function fetchArticles(): Promise<Article[]> {
  const { data } = await axios.get<Article[]>(`${API_BASE}/articles`)
  return data
}

export async function fetchArticle(id: number): Promise<Article> {
  const { data } = await axios.get<Article>(`${API_BASE}/articles/${id}`)
  return data
}
