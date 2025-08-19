/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      new URL("https://res.cloudinary.com/**"),
      new URL("https://btxfyvvmoyusrdokkitd.supabase.co/storage/v1/**"),
    ],
  },
};

export default config;
