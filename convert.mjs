
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SRC_DIR = path.join(__dirname, 'src');
let convertedCount = 0;
let renamedCount = 0;
let errorCount = 0;
function walkDir(dir, callback) {
  try {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        walkDir(filePath, callback);
      } else if (stat.isFile()) {
        callback(filePath);
      }
    });
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error.message);
  }
}
function convertTsxToJsx(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    content = content.replace(
      /import\s*{\s*type\s+\w+(\s*,\s*)?/g,
      (match) => {
        return match.replace(/\s*type\s+\w+\s*/g, '');
      }
    );
    content = content.replace(
      /import\s+type\s+{\s*[^}]*\}\s*from\s*['"][^'"]*['"]\s*;?\n?/g,
      ''
    );
    content = content.replace(
      /import\s+type\s+\w+\s+from\s+['"][^'"]*['"]\s*;?\n?/g,
      ''
    );
    content = content.replace(
      /:\s*(?:React\.\w+|HTMLButtonElement|HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement|CSSProperties|ReactNode|ReactElement|FC|FunctionComponent|VFC|PropsWithChildren|HTMLAttributes|ButtonHTMLAttributes|InputHTMLAttributes|SelectHTMLAttributes|TextareaHTMLAttributes|SVGAttributes|string|number|boolean|object|any|unknown|never|void|null|undefined|Array<[^>]+>|Record<[^>]+>|Partial<[^>]+>|Pick<[^>]+>|Omit<[^>]+>)\b/g,
      ''
    );
    content = content.replace(
      /React\.forwardRef<[^>]+>\(/g,
      'React.forwardRef('
    );
    content = content.replace(
      /export\s+interface\s+\w+[^{]*{[\s\S]*?^}/gm,
      ''
    );
    content = content.replace(
      /\s+as\s+React\.(FC|FunctionComponent)<[^>]+>/g,
      ''
    );
    content = content.replace(/\n\s*\n\s*\n/g, '\n\n');
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      return true;
    }
    return false;
  } catch (error) {
    console.error(`❌ Error converting ${filePath}:`, error.message);
    errorCount++;
    return false;
  }
}
function renameFile(oldPath, newPath) {
  try {
    fs.renameSync(oldPath, newPath);
    return true;
  } catch (error) {
    console.error(`❌ Error renaming ${oldPath}:`, error.message);
    errorCount++;
    return false;
  }
}
console.log('\n🚀 Starting TSX to JSX Conversion...\n');
console.log(`📁 Working directory: ${SRC_DIR}\n`);
walkDir(SRC_DIR, (filePath) => {
  if (filePath.endsWith('.tsx')) {
    const relativePath = path.relative(SRC_DIR, filePath);
    
    // Step 1: Convert file content
    if (convertTsxToJsx(filePath)) {
      convertedCount++;
      console.log(`✏️  Converted content: ${relativePath}`);
    }
    // Step 2: Rename file
    const jsxPath = filePath.replace(/\.tsx$/, '.jsx');
    if (renameFile(filePath, jsxPath)) {
      renamedCount++;
      console.log(`📝 Renamed file:      ${path.basename(filePath)} → ${path.basename(jsxPath)}`);
    }
  }
});
console.log(`\n${'═'.repeat(60)}`);
console.log(`✅ Conversion Complete!\n`);
console.log(`   ✓ Files with converted content: ${convertedCount}`);
console.log(`   ✓ Files renamed to .jsx: ${renamedCount}`);
if (errorCount > 0) {
  console.log(`   ⚠️  Errors encountered: ${errorCount}`);
}
console.log(`${'═'.repeat(60)}\n`);
console.log(`📋 Next Steps:\n`);
console.log(`   1. Review converted files for correctness`);
console.log(`   2. Update configuration files:`);
console.log(`      • Create jsconfig.json (or update tsconfig.json)`);
console.log(`      • Rename vite.config.ts → vite.config.js`);
console.log(`   3. Run: npm install`);
console.log(`   4. Run: npm run dev`);
console.log(`   5. Test your application thoroughly in browser\n`);
