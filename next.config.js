/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
      },
    experimental: {
        serverActions: true,
        serverComponentsExternalPackages: ["prisma"],
      },
    images:{
        domains:[
            'res.cloudinary.com'
        ]
    }
}

module.exports = nextConfig
