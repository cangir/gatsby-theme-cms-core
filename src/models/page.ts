import { Frontmatter } from "."

export interface Page {
  frontmatter: Frontmatter
  body: string
}
