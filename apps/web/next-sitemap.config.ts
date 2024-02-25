module.exports = {
  siteUrl: "https://mercadolocalpr.vercel.app/",
  changefreq: "daily",
  generateRobotsTxt: true, // (optional)
  priority: 0.9,
  transform: async (config: any, path: any) => {
    return {
      loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
};
