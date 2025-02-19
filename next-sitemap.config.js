/** @type {import('next-sitemap').IConfig} */
// next-sitemap.config.js
module.exports = {
  siteUrl: "https://taroblog.top",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  priority: 0.7,
  transform: async (config, path) => ({
    loc: path,
    changefreq: path === "/" ? "daily" : "weekly",
    priority: path === "/" ? 1 : config.priority,
    lastmod: new Date().toISOString()
  })
}
