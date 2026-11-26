import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

// The site is exported as plain files for GitHub Pages. BASE_PATH is the folder it is served from (empty for a user or custom-domain site, a
// sub-folder for a project site).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  ...(basePath ? { basePath } : {}),
};

export default withMDX(config);
