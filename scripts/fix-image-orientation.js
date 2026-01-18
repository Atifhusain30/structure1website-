const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imageDir = path.join(__dirname, '..', 'public', 'images', 'hero');

async function fixImageOrientation(filePath) {
  try {
    const ext = path.extname(filePath).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
      return;
    }
    
    // Skip backup files
    if (filePath.includes('.backup')) {
      return;
    }

    console.log(`Processing: ${path.basename(filePath)}`);
    
    // Read the image into a buffer first
    const inputBuffer = fs.readFileSync(filePath);
    
    // Get metadata
    const metadata = await sharp(inputBuffer).metadata();
    
    console.log(`  - Original orientation: ${metadata.orientation || 'none'}`);
    
    // Only process if orientation needs fixing (2-8)
    if (metadata.orientation && metadata.orientation > 1) {
      // Create a backup
      const backupPath = filePath + '.backup';
      if (!fs.existsSync(backupPath)) {
        fs.writeFileSync(backupPath, inputBuffer);
      }
      
      // Rotate based on EXIF and save
      const outputBuffer = await sharp(inputBuffer)
        .rotate() // Auto-rotate based on EXIF orientation
        .toBuffer();
      
      // Write back to the same file
      fs.writeFileSync(filePath, outputBuffer);
      
      console.log(`  - Fixed: ${path.basename(filePath)}`);
    } else {
      console.log(`  - Skipped (no rotation needed)`);
    }
  } catch (error) {
    console.error(`  - Error processing ${path.basename(filePath)}:`, error.message);
  }
}

async function processAllImages() {
  console.log('Starting image orientation fix...\n');
  console.log(`Image directory: ${imageDir}\n`);
  
  const files = fs.readdirSync(imageDir);
  
  for (const file of files) {
    const filePath = path.join(imageDir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isFile() && !file.includes('.backup')) {
      await fixImageOrientation(filePath);
    }
  }
  
  console.log('\nDone! All images have been processed.');
}

processAllImages().catch(console.error);
