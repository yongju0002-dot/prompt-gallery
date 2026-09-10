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
};

export default nextConfig;
