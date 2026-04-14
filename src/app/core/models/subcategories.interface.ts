
export interface SubcategoriesRespoce {
  results: number
  metadata: Metadata
  data: Subcategories[]
}

export interface Metadata {
  currentPage: number
  numberOfPages: number
  limit: number
}

export interface Subcategories {
  _id: string
  name: string
  slug: string
  category: string
  createdAt: string
  updatedAt: string
}
