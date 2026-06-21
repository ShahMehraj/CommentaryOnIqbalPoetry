/** @type {import('next').NextConfig} */

// On GitHub Pages this is served from a project subpath
// (https://<user>.github.io/<repo>/), so assets and links must be
// prefixed with the repo name. Locally (npm run dev) we keep it at root.
const repo = "CommentaryOnIqbalPoetry";
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  reactStrictMode: true,
  // Emit a fully static site into ./out for GitHub Pages.
  output: "export",
  // Pages has no image optimization server.
  images: { unoptimized: true },
  // Serve every route as a folder/index.html so refreshes work on Pages.
  trailingSlash: true,
  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "",
};

export default nextConfig;
