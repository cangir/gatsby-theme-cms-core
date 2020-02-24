import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import ComponentPlaceholder from "../components/component-placeholder"
import { Post, Tag } from "../models"

// import Image from "../components/image"

interface PostTemplateProps {
  data: {
    primaryTag: Tag | null
    post: Post
  }
  location: Location
}

const PostTemplate: React.FC<PostTemplateProps> = ({ data, location }) => {
  console.log(data)
  /*
   * TODO:
   */
  return (
    <Layout>
      <ComponentPlaceholder data={data} location={location} path={__filename} />
    </Layout>
  )
}

export default PostTemplate

export const query = graphql`
  query Post($postId: String!, $primaryTag: String!) {
    post: mdx(id: { eq: $postId }) {
      headings {
        depth
      }
      frontmatter {
        title
        path
        tags
        excerpt
        created
        createdPretty: created(formatString: "DD MMMM, YYYY")
        updated
        updatedPretty: updated(formatString: "DD MMMM, YYYY")
        featuredImage {
          childImageSharp {
            sizes(maxWidth: 800, quality: 75) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
      body
    }
    primaryTag: tags(name: { eq: $primaryTag }) {
      name
      color
    }
  }
`
