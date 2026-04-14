export interface CategoriesdataResponce {
  results: number
  metadata: Metadata
  data: Categoriesdata[]
}

export interface Metadata {
  currentPage: number
  numberOfPages: number
  limit: number
}

export interface Categoriesdata {
  _id: string
  name: string
  slug: string
  image: string
  createdAt: string
  updatedAt:string
}
