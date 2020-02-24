const withDefaults = require(`./src/utils/default-options`)

module.exports = themeOptions => {
  const options = withDefaults(themeOptions)

  return {
    siteMetadata: {
      title: options.siteTitle,
      siteUrl: options.siteUrl,
      description: options.siteDescription,
      topics: []
    },
    plugins: [
      `gatsby-plugin-typescript`,
      `gatsby-transformer-sharp`,
      `gatsby-plugin-sitemap`,
      `gatsby-plugin-sharp`,
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `content`,
          path: options.contentPath,
        },
      },
      {
        resolve: `gatsby-transformer-yaml`,
        options: {
          typeName: `Tags`
        }
      },
      options.mdxSupport && {
        resolve: "gatsby-plugin-mdx",
        options: {
          extensions: ["..mdx", ".md"],
          gatsbyRemarkPlugins: [
            "gatsby-remark-relative-images",
            {
              resolve: "gatsby-remark-images",
              options: {
                maxWidth: 1200
              },
            },
          ],
        },
      },
      {
        resolve: `gatsby-plugin-feed`,
        options: {
          query: `
            {
              site {
                siteMetadata {
                  title
                  description
                  siteUrl
                  site_url: siteUrl
                }
              }
            }
          `,
          feeds: [
            {
              serialize: ({ query: { site, allMdx } }) =>
                allMdx.edges.map(edge => ({
                  ...edge.node.frontmatter,
                  description: edge.node.frontmatter.excerpt,
                  date: edge.node.frontmatter.created,
                  url: site.siteMetadata.siteUrl + edge.node.frontmatter.path,
                  guid: site.siteMetadata.siteUrl + edge.node.frontmatter.path,
                  custom_elements: [{ "content:encoded": edge.node.body }],
                })),
              query: `
              {
                allMdx(
                  sort: { order: DESC, fields: [frontmatter___created] },
                  filter: { fileAbsolutePath: { regex: "/(posts)/.*\\\\.md$/" } }
                ) {
                  edges {
                    node {
                      body
                      frontmatter {
                        title
                        excerpt
                        path
                        created
                      }
                    }
                  }
                }
              }
              `,
              output: `/rss.xml`,
              title: `RSS Feed`,
            },
          ],
        },
      },
    ].filter(Boolean),
  }
}
