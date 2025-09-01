/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Ignorar warnings específicos de handlebars
    config.ignoreWarnings = [
      { module: /handlebars/, message: /require\.extensions/ },
    ];
    return config;
  },
};

module.exports = nextConfig;
