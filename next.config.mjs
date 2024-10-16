/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode:true,
    images:{
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.stockvault.net',
                pathname:'/data/**',
                port:""
            },
            {
                protocol: 'https',
                hostname: 'mui.com/static/images',
                pathname:'/**',
                port:""
            },
        ],
    }
};

export default nextConfig;
