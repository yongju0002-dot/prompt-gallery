import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Produces a self-contained .next/standalone build for the Docker image.
  output: "standalone",
  // The prompt/category stores are read with fs at request time, which the
  // file tracer can't follow — without this the standalone build ships
  // without src/data and every dynamic page 500s in production.
  outputFileTracingIncludes: {
    "/*": ["./src/data/*.json"],
  },
  // Consolidate www onto the apex domain so search engines see one site.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.mylifeimg.com" }],
        destination: "https://mylifeimg.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
