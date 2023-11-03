/** @type {import('next').NextConfig} */
const nextConfig = {
	// experimental: {
	// 	// serverComponentsExternalPackages: ['mongoose']
	// },
	typescript: {
		ignoreBuildErrors: true,
	},
	images: {
		path: "/",
	}

}

module.exports = nextConfig
