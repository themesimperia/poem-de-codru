import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
  const srcDir = path.resolve(__dirname, '1.PoemDecodru-Images');
  const destDirSrc = path.resolve(__dirname, 'src/assets/images');
  const destDirPublic = path.resolve(__dirname, 'public/assets/images');
  
  if (fs.existsSync(srcDir)) {
    // Ensure both destination directories exist
    if (!fs.existsSync(destDirSrc)) {
      fs.mkdirSync(destDirSrc, { recursive: true });
    }
    if (!fs.existsSync(destDirPublic)) {
      fs.mkdirSync(destDirPublic, { recursive: true });
    }
    
    // Also copy the cellar image from src to public if it exists
    const cellarSrc = path.join(destDirSrc, 'winery_heritage_cellar_1779621630425.png');
    const cellarDest = path.join(destDirPublic, 'winery_heritage_cellar_1779621630425.png');
    if (fs.existsSync(cellarSrc)) {
      fs.copyFileSync(cellarSrc, cellarDest);
    }

    const files = fs.readdirSync(srcDir);
    let copiedCount = 0;
    for (const file of files) {
      const srcFile = path.join(srcDir, file);
      const destFileSrc = path.join(destDirSrc, file);
      const destFilePublic = path.join(destDirPublic, file);
      
      if (fs.statSync(srcFile).isFile()) {
        fs.copyFileSync(srcFile, destFileSrc);
        fs.copyFileSync(srcFile, destFilePublic);
        copiedCount++;
      }
    }
    console.log(`[Asset Copier] Successfully copied ${copiedCount} files from 1.PoemDecodru-Images to src/assets/images and public/assets/images!`);
  } else {
    console.warn(`[Asset Copier] Source directory 1.PoemDecodru-Images not found at ${srcDir}`);
  }
} catch (err) {
  console.error('[Asset Copier] Failed to copy files:', err);
}
