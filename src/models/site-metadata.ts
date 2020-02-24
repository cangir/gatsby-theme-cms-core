import { MenuItem, SocialChannels } from "."

export interface SiteMetadata {
  site: {
    siteMetadata: {
      title: string
      siteUrl: string
      description: string
      topics: string[]
      menu: MenuItem[]
      footerMenu: MenuItem[]
      search: boolean
      author: {
        name: string
        description: string
        social: SocialChannels
      }
    }
  }
}
