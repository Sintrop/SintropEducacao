/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns: [
            {hostname: 'firebasestorage.googleapis.com'},
            {hostname: 'media.discordapp.net'}
        ]
    }
};

export default nextConfig;
