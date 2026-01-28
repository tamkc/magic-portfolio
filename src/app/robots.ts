import { baseURL } from "@/app/resources";

export const dynamic = "force-static";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: "/",
      },
    ],
    sitemap: `${baseURL}/sitemap.xml`,
  };
}
