// vite-plugin-rewrite-assets.js
import path from 'path';
import { promises as fs } from 'node:fs';
import { load } from 'cheerio';

export default function rewriteAssetsPlugin() {
    return {
        name: 'rewrite-assets',
        async generateBundle(options, bundle) {
            for (const [fileName, asset] of Object.entries(bundle)) {
                const ext = path.extname(fileName).toLowerCase();
                const baseName = path.basename(fileName, ext);

                console.log(`generateBundle processing: ${fileName} (type: ${asset.type}, ext: ${ext})`);

                // Reescritura de HTML
                if (fileName.endsWith('.html')) {
                    let html = asset.source.toString();
                    const $ = load(html, { xmlMode: false });

                    // Reescribir rutas CSS en <link rel="stylesheet">
                    $('link[rel="stylesheet"]').each((_, el) => {
                        const href = $(el).attr('href');
                        if (href?.endsWith('.css')) {
                            const newHref = href.replace(/^\/assets\//, '/style/').replace(/^\/style\/assets\//, '/style/');
                            $(el).attr('href', newHref);
                            console.log(`Reescrito CSS en HTML: ${href} -> ${newHref}`);
                        }
                    });

                    // Reescribir imágenes en <img>, <source>, etc.
                    $('img[src], source[src], [srcset]').each((_, el) => {
                        const src = $(el).attr('src') || $(el).attr('srcset');
                        if (src?.startsWith('/assets/')) {
                            const newSrc = src.replace('/assets/', '/assets/img/');
                            if ($(el).attr('src')) $(el).attr('src', newSrc);
                            if ($(el).attr('srcset')) $(el).attr('srcset', newSrc);
                            console.log(`Reescrito imagen en HTML: ${src} -> ${newSrc}`);
                        }
                    });

                    // Reescribir Workers en <script> o <link rel="modulepreload">
                    $('script[src], link[rel="modulepreload"]').each((_, el) => {
                        const src = $(el).attr('src') || $(el).attr('href');
                        if (src?.endsWith('.js') && src.includes('workers/')) {
                            const newSrc = src.replace(/^\/assets\//, '/js/');
                            if ($(el).attr('src')) $(el).attr('src', newSrc);
                            if ($(el).attr('href')) $(el).attr('href', newSrc);
                            console.log(`Reescrito Worker en HTML: ${src} -> ${newSrc}`);
                        }
                    });

                    asset.source = $.html();
                    continue;
                }

                // Reescritura de Workers en archivos JavaScript (chunks)
                if (asset.type === 'chunk' && ext === '.js') {
                    let code = asset.code;
                    // Buscar cualquier URL que apunte a /assets/ y contenga workers/
                    const workerRegex = /\/assets\/([a-zA-Z0-9_-]+?)(-[a-zA-Z0-9_-]+\.js)/gi;
                    if (code.includes('/assets/') && code.includes('workers/')) {
                        code = code.replace(workerRegex, '/js/$1$2');
                        asset.code = code;
                        console.log(`Reescrito Worker en JS: ${fileName} - /assets/ -> /js/`);
                    }
                }

                // Manejo de Workers (como asset)
                const isWorker = fileName.includes('workers/');

                if (isWorker && ext === '.js' && asset.type === 'asset') {
                    asset.fileName = `js/${baseName}${ext}`;
                    console.log(`Worker movido a: js/${baseName}${ext}`);
                    continue;
                }
            }
        },
        async writeBundle() {
            const directories = [
                'dist/js',
                'dist/style',
                'dist/assets/img',
                'dist/assets/fonts',
                'dist/assets/sounds',
                'dist/assets/videos',
                'dist/assets/cursor',
            ];
            for (const dir of directories) {
                try {
                    await fs.mkdir(dir, { recursive: true });
                    console.log(`Directorio creado: ${dir}`);
                } catch (err) {
                    console.error(`Error al crear directorio ${dir}:`, err);
                }
            }
        },
    };
}