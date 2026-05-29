import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import fs from 'fs';

// Automatically copy files from the user-selected 1.PoemDecodru-Images folder to the src/assets/images folder
try {
  const srcDir = path.resolve(__dirname, '1.PoemDecodru-Images');
  const destDirSrc = path.resolve(__dirname, 'src/assets/images');
  const destDirPublic = path.resolve(__dirname, 'public/assets/images');
  
  if (fs.existsSync(srcDir)) {
    if (!fs.existsSync(destDirSrc)) {
      fs.mkdirSync(destDirSrc, { recursive: true });
    }
    if (!fs.existsSync(destDirPublic)) {
      fs.mkdirSync(destDirPublic, { recursive: true });
    }
    
    // Copy the cellar image from src to public if it exists
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
    console.log(`[Vite Config] Successfully copied ${copiedCount} files from 1.PoemDecodru-Images to src/assets/images and public/assets/images!`);
  }
} catch (err) {
  console.error('[Vite Config] Failed to copy files:', err);
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâ€”file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
