import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_URL = 'https://homer.humanjuan.com';
const BASE_URL_SERVER = 'https://golyn.humanjuan.com';

const routes = [
    '/',
    '/#news',
];

const today = new Date().toISOString().split('T')[0];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${routes
                .map(
                    (route) => `  <url>
                <loc>${BASE_URL}${route}</loc>
                <lastmod>${today}</lastmod>
                <changefreq>monthly</changefreq>
                <priority>${route === '/' ? '1.0' : '0.7'}</priority>
              </url>`
                )
                .join('\n')}
        </urlset>`;

const robotsContent = `User-agent: *
        Allow: /
        
        Sitemap: ${BASE_URL}/sitemap.xml`;


const humansContent = `/* TEAM */
        Developer: Juan Alejandro
        GitHub: https://github.com/jpengineer
        LinkedIn: https://www.linkedin.com/in/japc27
        X (Twitter): https://x.com/jpengineer2018
        Website: ${BASE_URL}
        Server: ${BASE_URL_SERVER}
        Location: Chile
        
        /* SITE */
        Last update: ${today}
        Technology: JavaScript, HTML, CSS, Tailwind CSS, Gin, Golang, React, Vite, HTTPS, SSL (Let's Encrypt), Framer Motion, Responsive Design, SEO Optimization 
        `;


const sitemapOutputPath = path.join(__dirname, 'dist', 'sitemap.xml');
const robotsOutputPath = path.join(__dirname, 'dist', 'robots.txt');
const humansOutputPath = path.join(__dirname, 'dist', 'humans.txt');

fs.writeFileSync(sitemapOutputPath, sitemap);
fs.writeFileSync(robotsOutputPath, robotsContent);
fs.writeFileSync(humansOutputPath, humansContent);

console.log('sitemap.xml -->', sitemapOutputPath);
console.log('robots.txt -->', robotsOutputPath);
console.log('robots.txt -->', humansOutputPath);