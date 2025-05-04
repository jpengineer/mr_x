// vite.config.js (actualizado con middleware para Brotli)
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';
import { imagetools } from 'vite-imagetools';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'url';
import path from 'path';
import rewriteAssetsPlugin from './vite-plugin-rewrite-assets';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compressibleExtensions = [
    // JS ans TS
    'js', 'mjs', 'cjs', 'jsx', 'ts', 'tsx',
    // Styles
    'css', 'less', 'scss',
    // Doc and texts
    'html', 'htm', 'json', 'xml', 'yml', 'yaml',
    'md', 'mdx', 'txt', 'text', 'map',
    // Fonts
    'woff', 'woff2', 'eot', 'ttf', 'otf',
    // Others
    'webmanifest', 'pdf', 'doc', 'docx'
].join('|');
const compressFilter = new RegExp(`\\.(${compressibleExtensions})$`, 'i');

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        rewriteAssetsPlugin(),
        viteCompression({
            algorithm: 'brotliCompress',
            ext: '.br',
            threshold: 512, // bytes
            compressionOptions: {
                level: 11, // (0-11)
            },
            deleteOriginFile: false,
            filter: compressFilter,

        }),
        viteCompression({
            algorithm: 'gzip',
            ext: '.gz',
            threshold: 512, // bytes
            compressionOptions: {
                level: 9,  // (0-9)
            },
            deleteOriginFile: false,
            filter: compressFilter,

        }),

        imagetools({
            defaultDirectives: (url) => {
                if (url.pathname.match(/\.(png|jpg|jpeg)$/)) {
                    return new URLSearchParams({
                        format: 'webp',
                        quality: '80',
                    });
                }
                return new URLSearchParams();
            },
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    server: {
        host: '0.0.0.0',
        // https: {
        //     key: path.resolve(__dirname, 'src/certificates/private_key.pem'),
        //     cert: path.resolve(__dirname, 'src/certificates/certificate.pem'),
        // },
        proxy: {
            '/api': {
                target: 'https://golyn.humanjuan.com',
                changeOrigin: true,
                secure: false,
                // rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
    preview: {
        // Middleware to .br in vite preview
        middleware: [
            (req, res, next) => {
                const acceptEncoding = req.headers['accept-encoding'] || '';
                if (acceptEncoding.includes('br')) {
                    const filePath = path.join(__dirname, 'dist', req.url);
                    const brFilePath = `${filePath}.br`;
                    if (fs.existsSync(brFilePath)) {
                        res.setHeader('Content-Encoding', 'br');
                        res.setHeader('Content-Type', getContentType(filePath));
                        fs.createReadStream(brFilePath).pipe(res);
                        return;
                    }
                }
                if (acceptEncoding.includes('gzip')) {
                    const filePath = path.join(__dirname, 'dist', req.url);
                    const gzipFilePath = `${filePath}.gz`;
                    if (fs.existsSync(gzipFilePath)) {
                        res.setHeader('Content-Encoding', 'gzip');
                        res.setHeader('Content-Type', getContentType(filePath));
                        fs.createReadStream(gzipFilePath).pipe(res);
                        return;
                    }
                }

                next();
            },
        ],
    },
    assetsInclude: ['**/*.ttf', '**/*.woff', '**/*.woff2', '**/*.wav', '**/*.mp3', '**/*.ogg', '**/*.mp4', '**/*.webm'],
    build: {
        minify: 'esbuild',
        target: 'es2020',
        outDir: 'dist',
        emptyOutDir: true,
        chunkSizeWarningLimit: 500, // 500 KB
        sourcemap: false, // false for production
        cssCodeSplit: true,
        assetsInlineLimit: 4096, // 4 KB
        rollupOptions: {
            output: {
                entryFileNames: 'js/[name].js',
                chunkFileNames: 'js/[name].js',
                assetFileNames: (assetInfo) => {
                    const ext = path.extname(assetInfo.name || '').toLowerCase();
                    const baseName = path.basename(assetInfo.name || '', ext);
                    const isWorker = assetInfo.name && assetInfo.name.includes('workers/');

                    console.log(`assetFileNames processing: ${assetInfo.name} (ext: ${ext}, isWorker: ${isWorker})`);
                    if (isWorker && ext === '.js') {
                        console.log(`Worker detectado: ${assetInfo.name} -> js/${baseName}${ext}`);
                        return `js/${baseName}${ext}`;
                    } else if (ext === '.css') {
                        return `style/${baseName}${ext}`;
                    } else if (['.svg', '.webp', '.png', '.jpg', '.jpeg', '.gif'].includes(ext)) {
                        return `assets/img/${baseName}${ext}`;
                    } else if (['.ico'].includes(ext)) {
                            return `assets/${baseName}${ext}`;
                    } else if (['.cur'].includes(ext)) {
                            return `assets/cursor/${baseName}${ext}`;
                    } else if (['.woff', '.woff2', '.ttf', '.otf'].includes(ext)) {
                        return `assets/fonts/${baseName}${ext}`;
                    } else if (['.wav', '.mp3', '.ogg'].includes(ext)) {
                        return `assets/sounds/${baseName}${ext}`;
                    } else if (['.mp4', '.webm'].includes(ext)) {
                        return `assets/videos/${baseName}${ext}`;
                    } else {
                        return `assets/${baseName}${ext}`;
                    }
                },
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        if (id.includes('react') || id.includes('react-dom')) {
                            return 'vendor_react';
                        }
                        if (id.includes('three')) {
                            return 'vendor_three';
                        }
                        const pkg = id.match(/node_modules\/(.*?)(\/|$)/)?.[1];
                        return pkg ? `vendor_${pkg}` : 'vendor';
                    }
                },
            },
            treeshake: {
                moduleSideEffects: true,
                propertyReadSideEffects: false,
                tryCatchDeoptimization: false
            }
        },
        commonjsOptions: {
            include: [/node_modules/],
            extensions: ['.js', '.cjs'],
            strictRequires: true,
            transformMixedEsModules: true,
        },

    },
    worker: {
        format: 'es',
        rollupOptions: {
            output: {
                entryFileNames: 'js/[name].js',
                chunkFileNames: 'js/[name].js',
                assetFileNames: 'js/[name][extname]',
            },
        },
    },
});

function getContentType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    switch (ext) {
        // js and ts
        case '.js':
        case '.mjs':
        case '.cjs':
            return 'application/javascript';
        case '.jsx':
            return 'text/jsx';
        case '.ts':
            return 'application/typescript';
        case '.tsx':
            return 'text/tsx';

        // styles
        case '.css':
            return 'text/css';
        case '.scss':
        case '.sass':
            return 'text/x-scss';
        case '.less':
            return 'text/x-less';

        // doc
        case '.html':
        case '.htm':
            return 'text/html';
        case '.xml':
            return 'application/xml';
        case '.json':
            return 'application/json';
        case '.pdf':
            return 'application/pdf';
        case '.md':
        case '.markdown':
            return 'text/markdown';
        case '.txt':
            return 'text/plain';
        case '.yaml':
        case '.yml':
            return 'application/yaml';

        // fonts
        case '.woff':
            return 'font/woff';
        case '.woff2':
            return 'font/woff2';
        case '.ttf':
            return 'font/ttf';
        case '.otf':
            return 'font/otf';
        case '.eot':
            return 'application/vnd.ms-fontobject';

        // images
        case '.svg':
            return 'image/svg+xml';
        case '.webp':
            return 'image/webp';
        case '.png':
            return 'image/png';
        case '.jpg':
        case '.jpeg':
            return 'image/jpeg';
        case '.gif':
            return 'image/gif';
        case '.ico':
            return 'image/x-icon';

        // audio
        case '.mp3':
            return 'audio/mpeg';
        case '.wav':
            return 'audio/wav';
        case '.ogg':
            return 'audio/ogg';

        // video
        case '.mp4':
            return 'video/mp4';
        case '.webm':
            return 'video/webm';

        // others
        case '.webmanifest':
            return 'application/manifest+json';
        case '.map':
            return 'application/json';
        case '.doc':
            return 'application/msword';
        case '.docx':
            return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

        // Fallback unknown type
        default:
            return 'application/octet-stream';
    }
}