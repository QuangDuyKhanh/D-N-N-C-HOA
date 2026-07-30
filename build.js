const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.join(__dirname, 'index.html');
const indexPhpPath = path.join(__dirname, 'index.php');
const adminHtmlPath = path.join(__dirname, 'admin.html');
const adminPhpPath = path.join(__dirname, 'admin.php');
const headerPath = path.join(__dirname, 'header.php');
const footerPath = path.join(__dirname, 'footer.php');
const homeComponentsDir = path.join(__dirname, 'components', 'home');

const sectionDefinitions = [
  { name: 'hero.php', marker: '<!-- 3. HERO SECTION (BANNER & PARTICLES) -->' },
  { name: 'about.php', marker: '<!-- 4. BRAND STORY & INTRODUCTION -->' },
  { name: 'best-sellers.php', marker: '<!-- 5. BEST SELLERS SECTION (SLIDER) -->' },
  { name: 'flash-sale.php', marker: '<!-- 6. FLASH SALE SECTION (COUNTDOWN) -->' },
  { name: 'tester-slide.php', marker: '<!-- 6.5. TESTER ULTRA SLIDE SECTION -->' },
  { name: 'collections.php', marker: '<!-- 8. PRODUCT COLLECTIONS GRID -->' },
  { name: 'why-choose.php', marker: '<!-- 10. WHY CHOOSE DOCI SECTION -->' },
  { name: 'video-review.php', marker: '<!-- 10.5. VIDEO REVIEW SECTION -->' },
  { name: 'reviews.php', marker: '<!-- 11. CUSTOMER REVIEWS SECTION -->' },
  { name: 'faq.php', marker: '<!-- 13. FAQ SECTION -->' },
  { name: 'contact.php', marker: '<!-- 14. CONTACT SECTION -->' },
  { name: 'cart-drawer.php', marker: '<!-- 16. SIDE-DRAWER GIỎ HÀNG (SLIDE-OUT CART) -->' },
  { name: 'checkout-modal.php', marker: '<!-- 17. FORM ĐẶT HÀNG NHANH (SIMULATED CHECKOUT MODAL) -->' },
  { name: 'product-modal.php', marker: '<!-- 18. MODAL CHI TIẾT SẢN PHẨM (PRODUCT DETAILS MODAL) -->' }
];
const endMarker = '<!-- FLOATING WIDGETS -->';

// Hàm đệ quy giải quyết tất cả include php
function resolveIncludes(content) {
  const includeRegex = /<\?php\s+include\s+['"]([^'"]+)['"];?\s*\?>/g;
  let match;
  let newContent = content;
  
  includeRegex.lastIndex = 0;
  
  while ((match = includeRegex.exec(content)) !== null) {
    const includePath = match[0];
    const fileTarget = match[1];
    const fullPath = path.isAbsolute(fileTarget) 
      ? fileTarget 
      : path.join(__dirname, fileTarget);
    
    if (fs.existsSync(fullPath)) {
      const fileContent = fs.readFileSync(fullPath, 'utf8');
      const resolvedFileContent = resolveIncludes(fileContent);
      newContent = newContent.replace(includePath, resolvedFileContent);
    } else {
      console.warn(`Warning: Included file not found: ${fileTarget} (${fullPath})`);
      newContent = newContent.replace(includePath, `<!-- Warning: ${fileTarget} not found -->`);
    }
  }
  return newContent;
}

// Hàm chia tách index.html thành các file nhỏ trong thư mục components/home/
function splitSections() {
  if (!fs.existsSync(indexHtmlPath)) {
    console.error('index.html not found!');
    return;
  }

  if (!fs.existsSync(homeComponentsDir)) {
    fs.mkdirSync(homeComponentsDir, { recursive: true });
  }

  const htmlContent = fs.readFileSync(indexHtmlPath, 'utf8');

  const positions = [];
  for (const def of sectionDefinitions) {
    const idx = htmlContent.indexOf(def.marker);
    if (idx === -1) {
      console.warn(`Warning: Marker "${def.marker}" not found. Skipped.`);
      continue;
    }
    positions.push({ name: def.name, marker: def.marker, index: idx });
  }

  positions.sort((a, b) => a.index - b.index);

  const endIdx = htmlContent.indexOf(endMarker);
  if (endIdx === -1) {
    console.error(`Error: End marker "${endMarker}" not found!`);
    return;
  }

  positions.push({ name: 'end', index: endIdx });

  for (let i = 0; i < positions.length - 1; i++) {
    const current = positions[i];
    const next = positions[i + 1];
    const sectionContent = htmlContent.substring(current.index, next.index).trim();
    
    const filePath = path.join(homeComponentsDir, current.name);
    fs.writeFileSync(filePath, sectionContent + '\n', 'utf8');
    console.log(`Saved component: components/home/${current.name}`);
  }

  let indexPhpContent = `<?php include 'header.php'; ?>\n\n`;
  for (let i = 0; i < positions.length - 1; i++) {
    indexPhpContent += `<!-- Include ${positions[i].name} -->\n`;
    indexPhpContent += `<?php include 'components/home/${positions[i].name}'; ?>\n\n`;
  }
  indexPhpContent += `<?php include 'footer.php'; ?>\n`;

  fs.writeFileSync(indexPhpPath, indexPhpContent, 'utf8');
  console.log('Created index.php with all component includes!');
}

// Hàm build đệ quy từ PHP files ra HTML files
function buildHtml() {
  if (fs.existsSync(indexPhpPath)) {
    console.log('Resolving PHP includes for index.php...');
    const finalIndexHtml = resolveIncludes(fs.readFileSync(indexPhpPath, 'utf8'));
    fs.writeFileSync(indexHtmlPath, finalIndexHtml, 'utf8');
    console.log('Successfully compiled index.html!');
  } else {
    console.warn('index.php not found!');
  }

  if (fs.existsSync(adminPhpPath)) {
    console.log('Resolving PHP includes for admin.php...');
    const finalAdminHtml = resolveIncludes(fs.readFileSync(adminPhpPath, 'utf8'));
    fs.writeFileSync(adminHtmlPath, finalAdminHtml, 'utf8');
    console.log('Successfully compiled admin.html!');
  } else {
    console.warn('admin.php not found!');
  }
}

const args = process.argv.slice(2);
if (args.includes('--init-sections')) {
  splitSections();
} else {
  buildHtml();
}
