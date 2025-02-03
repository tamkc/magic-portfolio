import mdx from "@next/mdx";

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: true,
  },
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    domains: [
      "api.microlink.io",
    ],
  },
};

export default withMDX(nextConfig);
