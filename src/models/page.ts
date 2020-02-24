import { Frontmatter } from "../models"

export interface Page {
  frontmatter: Frontmatter
  body: string
}
