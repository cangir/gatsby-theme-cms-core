import { Frontmatter } from "."

export interface Post {
  frontmatter: Frontmatter
  body: string
  headings: Array<{ depth: number }>
}
