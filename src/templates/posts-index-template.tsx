import React from "react"
import { Post } from "../models"
import Layout from "../components/layout"
import ComponentPlaceholder from "../components/component-placeholder"

interface PostsPageProps {
  pathContext: {
    posts: Post[]
    postsPerPage: number
  }
  location: Location
}

const PostsTemplate: React.FC<PostsPageProps> = ({ pathContext, location }) => (
  <Layout>
    <ComponentPlaceholder data={pathContext} location={location} path={__filename} />
  </Layout>
)

export default PostsTemplate
