module.exports = themeOptions => {
  const basePath = themeOptions.basePath || `/`
  const blogPath = themeOptions.blogPath || `/blog`
  const contentPath = themeOptions.contentPath || `content`
  const mediaPath = themeOptions.mediaPath || `content/media`
  const postsPath = themeOptions.postsPath || `content/posts`
  const pagesPath = themeOptions.pagesPath || `content/pages`
  const dataPath = themeOptions.dataPath || `content/data`
  const tagsPath = themeOptions.tagsPath || `/tags`
  const tagSlug = themeOptions.tagSlug || `tag`
  const externalLinks = themeOptions.externalLinks || []
  const navigation = themeOptions.navigation || []
  const showLineNumbers = themeOptions.showLineNumbers || true
  const postsPerPage = themeOptions.postsPerPage || 5
  const loadDefaultPages = themeOptions.loadDefaultPages || true
  const mdxSupport  = themeOptions.mdxSupport || true
  const siteTitle = themeOptions.siteTitle || `Site Title`
  const siteUrl = themeOptions.siteUrl || `https://localhost:8000`
  const siteDescription = themeOptions.siteDescription || `Site Description`


  return {
    basePath,
    contentPath,
    mediaPath,
    blogPath,
    postsPath,
    pagesPath,
    dataPath,
    tagsPath,
    tagSlug,
    externalLinks,
    navigation,
    showLineNumbers,
    postsPerPage,
    loadDefaultPages,
    mdxSupport,
    siteTitle,
    siteUrl,
    siteDescription,
  }
}
