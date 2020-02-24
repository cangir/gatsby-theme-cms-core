const fs = require(`fs`)
const mkdirp = require(`mkdirp`)
const path = require(`path`)
const { fmImagesToRelative } = require(`gatsby-remark-relative-images`)
const withDefaults = require(`./src/utils/default-options`)

const slugify = require(`slugify`)

/*
 * Ensure that content directories exist at site-level
 * If non-existent they'll be created here (as empty folders)
 */
exports.onPreBootstrap = ({ reporter, store }, themeOptions) => {
  const { program } = store.getState()

  const { contentPath, dataPath, mediaPath, postsPath, pagesPath } = withDefaults(themeOptions)
  // const { contentPath, assetsPath } = withDefaults(themeOptions)

  const dirs = [
    path.join(program.directory, contentPath),
    path.join(program.directory, dataPath),
    path.join(program.directory, mediaPath),
    path.join(program.directory, postsPath),
    path.join(program.directory, pagesPath),
  ]

  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      reporter.info(`Initializing "${dir}" directory`)
      mkdirp(dir)
    }
  })
}

/*
 * Take every node returned by gatsby-source plugins
 * Convert any absolute paths in frontmatter into relative paths
 * Note: Requires a matching file in absolute path.
 */
exports.onCreateNode = ({ node }) => {
  fmImagesToRelative(node)
}

exports.createPages = async ({ graphql, actions, reporter }, themeOptions) => {
  const { basePath, pagesPath, postsPath, tagsPath, tagSlug, postsPerPage } = withDefaults(themeOptions)

  const result = await graphql(`
    query {
      pages: allMdx(filter: { fileAbsolutePath: { regex: "/(/(${pagesPath})/).*.(md)/" } }) {
        edges {
          node {
            frontmatter {
              title
              excerpt
              path
            }
            body
          }
        }
      }
      posts: allMdx(
        filter: { fileAbsolutePath: { regex: "/(${postsPath})/.*\\\\.md$/" } }
        sort: { fields: frontmatter___created, order: DESC }
      ) {
        edges {
          node {
            id
            frontmatter {
              path
              tags 
            }
          }
        }
      }
      tags: allTags {
        edges {
          node {
            name
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panic(result.errors)
  }

  const tags = []
  const posts = result.data.posts.edges.map(node => node.node)
  const pages = result.data.pages.edges.map(node => node.node)
  const availableTags = result.data.tags.edges.map(node => node.node).map(t => t.name) || []

  // Create a route for every single post (located in `content/posts`)
  posts.forEach(post => {
    if (post.frontmatter.tags) {
      tags.push(...post.frontmatter.tags)
    }
    const primaryTag = post.frontmatter.tags.length > 0 ? post.frontmatter.tags[0] : null
    actions.createPage({
      path: post.frontmatter.path,
      component: require.resolve(`./src/templates/post-template.tsx`),
      context: {
        postId: post.id,
        primaryTag,
      },
    })
  })

  // Create a route for every single page (located in `content/pages`)
  pages.forEach(page => {
    actions.createPage({
      path: page.frontmatter.path,
      component: require.resolve(`./src/templates/page-template.tsx`),
      context: {
        page,
      },
    })
  })

  // Create a route for every single route (from `content/tags.yml` and the tags found in posts)
  ;[...new Set(tags)].concat(availableTags).forEach(tag => {
    const slugified = slugify(tag, { lower: true })
    actions.createPage({
      path: `/${tagSlug}/${slugified}`,
      component: require.resolve(`./src/templates/tag-template.tsx`),
      context: {
        tag,
      },
    })
  })

  // The index page
  actions.createPage({
    path: basePath,
    component: require.resolve(`./src/templates/posts-index-template.tsx`),
    context: {
      posts,
      postsPerPage,
    },
  })

  // The Tags index page
  actions.createPage({
    path: tagsPath,
    component: require.resolve(`./src/templates/tags-index-template.tsx`),
    context: {
      posts,
      postsPerPage,
    },
  })

  // 404
  actions.createPage({
    path: `/404`,
    component: require.resolve(`./src/templates/not-found-template.tsx`),
  })
}
