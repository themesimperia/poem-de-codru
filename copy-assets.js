import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
  const srcDir = path.resolve(__dirname, '1.PoemDecodru-Images');
  const destDir = path.resolve(__dirname, 'src/assets/images');
  if (fs.existsSync(srcDir)) {
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    const files = fs.readdirSync(srcDir);
    let copiedCount = 0;
    for (const file of files) {
      const srcFile = path.join(srcDir, file);
      const destFile = path.join(destDir, file);
      if (fs.statSync(srcFile).isFile()) {
        fs.copyFileSync(srcFile, destFile);
        copiedCount++;
      }
    }
    console.log(`[Asset Copier] Successfully copied ${copiedCount} files from 1.PoemDecodru-Images to src/assets/images!`);
  } else {
    console.warn(`[Asset Copier] Source directory 1.PoemDecodru-Images not found at ${srcDir}`);
  }
} catch (err) {
  console.error('[Asset Copier] Failed to copy files:', err);
}
