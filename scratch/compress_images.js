const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(__dirname, '../public');
const files = fs.readdirSync(dir);

(async () => {
  let totalSaved = 0;
  for (const f of files) {
    const ext = path.extname(f).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;

    const fullPath = path.join(dir, f);
    const stat = fs.statSync(fullPath);
    if (stat.size < 150000) continue; // Skip small images

    const tempPath = path.join(dir, 'tmp_' + f);
    try {
      if (ext === '.png') {
        await sharp(fullPath)
          .png({ quality: 80, compressionLevel: 9, palette: true })
          .toFile(tempPath);
      } else {
        await sharp(fullPath)
          .jpeg({ quality: 80, mozjpeg: true })
          .toFile(tempPath);
      }

      const newStat = fs.statSync(tempPath);
      if (newStat.size < stat.size) {
        fs.unlinkSync(fullPath);
        fs.renameSync(tempPath, fullPath);
        const saved = stat.size - newStat.size;
        totalSaved += saved;
        console.log(`Compressed ${f}: ${(stat.size/1024).toFixed(0)}KB -> ${(newStat.size/1024).toFixed(0)}KB`);
      } else {
        if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
      }
    } catch (e) {
      console.warn(`Error compressing ${f}:`, e.message);
      if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    }
  }
  console.log(`Total saved: ${(totalSaved/1024/1024).toFixed(2)} MB`);
})();
