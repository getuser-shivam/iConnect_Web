const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    // Colors
    content = content.replace(/#e5c184/g, '#00E5FF');
    content = content.replace(/#af9052/g, '#00B8D4');
    content = content.replace(/#060608/g, '#080B1A');
    content = content.replace(/#0a0a0f/g, '#0C1024');
    content = content.replace(/#0f0f16/g, '#111630');
    content = content.replace(/#111118/g, '#131936');
    content = content.replace(/#08080c/g, '#0A0D1F');
    content = content.replace(/#0c0c12/g, '#0D1126');
    content = content.replace(/#050508/g, '#050714');

    // Classes
    content = content.replace(/text-gold-gradient/g, 'text-cyan-gradient');

    // Shadows (rgba(229,193,132) -> rgba(0,229,255))
    content = content.replace(/229,193,132/g, '0,229,255');
    content = content.replace(/229,\s*193,\s*132/g, '0, 229, 255');

    fs.writeFileSync(filePath, content);
}

replaceInFile('src/App.tsx');

const componentsDir = 'src/components';
if (fs.existsSync(componentsDir)) {
    const files = fs.readdirSync(componentsDir);
    for (const file of files) {
        if (file.endsWith('.tsx')) {
            replaceInFile(path.join(componentsDir, file));
        }
    }
}
console.log('Theme updated in App.tsx and components!');
