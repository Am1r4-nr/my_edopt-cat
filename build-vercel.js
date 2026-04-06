const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Step 1: Run Vite build
console.log('Building with Vite...');
execSync('npm run build', { stdio: 'inherit' });

// Step 2: Read the Vite manifest
const manifestPath = path.resolve('public/build/.vite/manifest.json');
if (!fs.existsSync(manifestPath)) {
    console.error('Manifest not found at:', manifestPath);
    process.exit(1);
}
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
console.log('Manifest keys:', Object.keys(manifest));

// Step 3: Get hashed asset paths
const cssEntry = manifest['resources/css/app.css'];
const jsEntry  = manifest['resources/js/app.jsx'];

const cssFile = cssEntry ? '/assets/' + path.basename(cssEntry.file) : null;
const jsFile  = jsEntry  ? '/assets/' + path.basename(jsEntry.file)  : null;

console.log('CSS file:', cssFile);
console.log('JS file:', jsFile);

// Step 4: Generate static index.html
const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>E-DOPTCAT</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&display=swap" rel="stylesheet">
    ${cssFile ? '<link rel="stylesheet" href="' + cssFile + '">' : ''}
</head>
<body class="font-sans antialiased">
    <div id="app"></div>
    ${jsFile ? '<script type="module" src="' + jsFile + '"></script>' : ''}
</body>
</html>`;

// Step 5: Prepare dist/ directory
const distDir = path.resolve('dist');
if (fs.existsSync(distDir)) fs.rmSync(distDir, { recursive: true });
fs.mkdirSync(distDir);

// Step 6: Write index.html to dist/
fs.writeFileSync(path.join(distDir, 'index.html'), html);
console.log('Generated dist/index.html');

// Step 7: Copy assets
const srcAssets  = path.resolve('public/build/assets');
const destAssets = path.join(distDir, 'assets');
if (fs.existsSync(srcAssets)) {
    fs.cpSync(srcAssets, destAssets, { recursive: true });
    console.log('Copied assets to dist/assets');
} else {
    console.warn('No assets folder found at:', srcAssets);
}

console.log('Vercel build complete! Output in dist/');
