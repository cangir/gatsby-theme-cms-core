import { Frontmatter } from "../models"

export interface Post {
  frontmatter: Frontmatter
  body: string
  headings: Array<{ depth: number }>
}
