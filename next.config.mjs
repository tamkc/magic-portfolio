import mdx from "@next/mdx";

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

const isProd = process.env.NODE_ENV === "production";
const basePathValue = isProd ? "/magic-portfolio" : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: basePathValue,
  assetPrefix: basePathValue,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePathValue,
  },
  experimental: {
    reactCompiler: true,
  },
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.microlink.io",
      },
    ],
  },
};

export default withMDX(nextConfig);
