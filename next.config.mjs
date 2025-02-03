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
  webpack: (config) => {
    const indexOfCSSLoaderRule = config.module.rules.findIndex((rule) =>
      rule.test.toString().includes("css")
    );
    config.module.rules[indexOfCSSLoaderRule].options.modules.localIdentName =
      "[hash:base64:5]";
    return config;
  },
};

export default withMDX(nextConfig);
