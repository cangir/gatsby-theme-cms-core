import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import ComponentPlaceholder from "../components/component-placeholder"
import { Post, Tag } from "../models"

interface TagTemplateProps {
  data: {
    tag: Tag
    posts: {
      edges: Array<{ node: Post }>
    }
  }
  location: Location
}

const TagTemplate: React.FC<TagTemplateProps> = ({ data, location }) => (
  <Layout>
    <ComponentPlaceholder data={data} location={location} path={__filename} />
  </Layout>
)

export default TagTemplate

export const query = graphql`
  query($tag: String!) {
    tag: tags(name: { eq: $tag }) {
      name
      color
    }
    posts: allMdx(
      filter: { fileAbsolutePath: { regex: "/(posts)/.*\\\\.md$/" }, frontmatter: { tags: { eq: $tag } } }
      sort: { fields: frontmatter___created, order: DESC }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            path
            tags
            excerpt
            created
            createdPretty: created(formatString: "DD MMMM, YYYY")
            featuredImage {
              childImageSharp {
                sizes(maxWidth: 800, quality: 100) {
                  base64
                  aspectRatio
                  src
                  srcSet
                  sizes
                }
              }
            }
          }
        }
      }
    }
  }
`
