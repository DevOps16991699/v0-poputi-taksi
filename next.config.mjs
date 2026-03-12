/** @type {import('next').NextConfig} */
const nextConfig = {
  // Note: For Capacitor mobile build, uncomment the line below:
  // output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
