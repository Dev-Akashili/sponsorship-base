/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/sponsorship-base",
  assetPrefix: "/sponsorship-base",
  output: "export",
  images: {
    unoptimized: true
  }
};

const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.jsx"
});

module.exports = withNextra(nextConfig);