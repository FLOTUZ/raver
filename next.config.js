/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push("chrome-aws-lambda");
    }
    // Ignorar warnings específicos de handlebars
    config.ignoreWarnings = [
      { module: /handlebars/, message: /require\.extensions/ },
    ];
    return config;
  },
};

module.exports = nextConfig;
