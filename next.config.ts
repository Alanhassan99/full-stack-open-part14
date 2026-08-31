import path from "path"
import createMDX from '@next/mdx'

const nextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  experimental: {
    mdxRs: true,
  },
}

const withMDX = createMDX({
  extension: /\.mdx?$/,
})

export default withMDX(nextConfig)