const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3000';
const OUTPUT_DIR = path.join(__dirname, '..', 'screenshots');

const PAGES = [
  { path: '/', name: 'landing' },
  { path: '/dashboard', name: 'dashboard' },
  { path: '/dashboard/roi', name: 'roi' },
  { path: '/dashboard/coaching', name: 'coaching' },
  { path: '/dashboard/recruitment', name: 'recruitment' },
  { path: '/dashboard/employees/1', name: 'employee_profile' },
  { path: '/dashboard/assessments', name: 'assessments' },
  { path: '/dashboard/skills', name: 'skills' }
];

(async () => {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'] 
  });
  const page = await browser.newPage();

  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 }); // Double density for "professional" look

  console.log('Starting screenshot capture...');

  for (const pageInfo of PAGES) {
    const url = `${BASE_URL}${pageInfo.path}`;
    console.log(`Navigating to ${url}...`);
    try {
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
      // Extra wait for animations or lazy loading
      await new Promise(r => setTimeout(r, 2000)); 
      
      const screenshotPath = path.join(OUTPUT_DIR, `${pageInfo.name}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: false });
      console.log(`Saved ${pageInfo.name}.png`);
    } catch (error) {
      console.error(`Failed to capture ${pageInfo.name}: ${error.message}`);
    }
  }

  await browser.close();
  console.log('All screenshots captured.');
})();
