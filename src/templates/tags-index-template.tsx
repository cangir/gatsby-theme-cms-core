import React from "react"
import { graphql } from "gatsby"
import { Tag } from "../models"
import Layout from "../components/layout"
import ComponentPlaceholder from "../components/component-placeholder"

interface TagsIndexProps {
  data: {
    allTags: {
      edges: Array<{ node: Tag }>
    }
  }
  location: Location
}

const TagsTemplate: React.FC<TagsIndexProps> = ({ data, location }) => (
  <Layout>
    <ComponentPlaceholder data={data} location={location} path={__filename} />
  </Layout>
)

export default TagsTemplate

export const query = graphql`
  query {
    allTags {
      edges {
        node {
          name
          icon
        }
      }
    }
  }
`
