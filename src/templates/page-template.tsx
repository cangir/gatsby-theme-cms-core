import React from "react"
import Layout from "../components/layout"
import ComponentPlaceholder from "../components/component-placeholder"
import { Page } from "../models"

interface PageTemplateProps {
  pathContext: {
    page: Page
  }
  location: Location
}

const PageTemplate: React.FC<PageTemplateProps> = ({ pathContext, location }) => {
  console.log(pathContext.page)

  return (
    <Layout>
      <ComponentPlaceholder data={pathContext} location={location} path={__filename} />
    </Layout>
  )
}

export default PageTemplate
