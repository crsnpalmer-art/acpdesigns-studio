import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ACP Designs Studio",
    short_name: "ACP Studio",
    description:
      "Carson Palmer builds useful systems for real property operations, practical software, and human-supervised AI.",
    start_url: "/",
    display: "standalone",
    background_color: "#fafaf8",
    theme_color: "#131c1a",
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
