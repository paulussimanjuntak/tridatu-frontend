module.exports = {
  images: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    domains: [`${process.env.NEXT_PUBLIC_IMAGE_HOSTNAME}`],
    path: '/_next/image',
    loader: 'default',
  },
}
