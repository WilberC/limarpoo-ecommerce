import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchArticles, fetchArticle, type Article } from '@/api/articles'

export const useArticlesStore = defineStore('articles', () => {
  const articles = ref<Article[]>([])
  const currentArticle = ref<Article | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadArticles() {
    if (articles.value.length > 0) return
    loading.value = true
    error.value = null
    try {
      articles.value = await fetchArticles()
    } catch {
      error.value = 'Failed to load articles'
    } finally {
      loading.value = false
    }
  }

  async function loadArticle(id: number) {
    loading.value = true
    error.value = null
    currentArticle.value = null
    try {
      currentArticle.value = await fetchArticle(id)
    } catch {
      error.value = 'Failed to load article'
    } finally {
      loading.value = false
    }
  }

  return { articles, currentArticle, loading, error, loadArticles, loadArticle }
})
