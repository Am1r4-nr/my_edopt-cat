const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Step 1: Run Vite build
console.log('Building with Vite...');
execSync('npm run build', { stdio: 'inherit' });

// Step 2: Find manifest (could be in .vite/ or directly in public/build/)
let manifestPath = path.resolve('public/build/.vite/manifest.json');
if (!fs.existsSync(manifestPath)) {
    manifestPath = path.resolve('public/build/manifest.json');
}
if (!fs.existsSync(manifestPath)) {
    console.error('Could not find Vite manifest. Checked:');
    console.error('  public/build/.vite/manifest.json');
    console.error('  public/build/manifest.json');
    process.exit(1);
}

console.log('Found manifest at:', manifestPath);
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
console.log('Manifest keys:', Object.keys(manifest).slice(0, 10));

// Step 3: Find JS and CSS entry points by searching manifest keys
let cssFile = null;
let jsFile = null;

for (const [key, value] of Object.entries(manifest)) {
    if (key.includes('resources/js/app') && value.isEntry) {
        jsFile = '/build/' + value.file;
        // Also get CSS files imported by the JS entry
        if (value.css && value.css.length > 0) {
            cssFile = '/build/' + value.css[0];
        }
    }
    if (key.includes('resources/css/app') && value.isEntry) {
        cssFile = '/build/' + value.file;
    }
}

console.log('JS entry:', jsFile);
console.log('CSS entry:', cssFile);

// Step 4: Generate static index.html
const cssTag  = cssFile ? '<link rel="stylesheet" href="' + cssFile + '">' : '';
const jsTag   = jsFile  ? '<script type="module" src="' + jsFile + '"></script>' : '';

const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>E-DOPTCAT</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&display=swap" rel="stylesheet">
    ${cssTag}
</head>
<body class="font-sans antialiased">
    <div id="app"></div>
    ${jsTag}
</body>
</html>`;

// Step 5: Prepare dist/ directory
const distDir = path.resolve('dist');
if (fs.existsSync(distDir)) fs.rmSync(distDir, { recursive: true });
fs.mkdirSync(distDir);

// Step 6: Write index.html
fs.writeFileSync(path.join(distDir, 'index.html'), html);
console.log('Generated dist/index.html');

// Step 7: Copy entire public/build into dist/build
const srcBuild  = path.resolve('public/build');
const destBuild = path.join(distDir, 'build');
fs.cpSync(srcBuild, destBuild, { recursive: true });
console.log('Copied public/build -> dist/build');

console.log('Vercel build complete! Output in dist/');
