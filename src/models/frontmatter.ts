import ImageFluid from "gatsby-image"

export interface Frontmatter {
  title: string
  path: string
  tags: string[]
  excerpt: string
  created: string
  createdPretty: string
  updated: string
  updatedPretty: string
  featuredImage?: ImageFluid
}
