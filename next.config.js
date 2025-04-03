/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		unoptimized: true,
	},
	// Your web app's Firebase configuration
	env: {
		API_KEY: "",
		AUTH_DOMAIN: "",
		PROJECT_ID: "",
		STORAGE_BUCKET: "",
		MESSAGING_SENDER_ID: "",
		APP_ID: "",
	},
};

module.exports = nextConfig;
