/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    // Important: return the modified config
    // config.externals.sharp = "commonjs sharp";
    // config.module.rules.push({ test: /\.node$/, use: "node-loader" });
    return config;
  },
};
