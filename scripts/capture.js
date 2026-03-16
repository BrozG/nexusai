const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    
    // 1. Landing Page Screenshot
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    await page.screenshot({ path: 'C:\\Users\\HP\\.gemini\\antigravity\\brain\\8a897d48-ea2b-4f91-aace-43706d6df6da\\final_landing_page.png' });
    
    // 2. Dashboard Initial View Screenshot
    await page.goto('http://localhost:3000/dashboard', { waitUntil: 'networkidle0' });
    
    // 3. Click Telecom Domain
    await page.click('div > div > div > button:nth-child(2)'); // Telecom is the 2nd button
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: 'C:\\Users\\HP\\.gemini\\antigravity\\brain\\8a897d48-ea2b-4f91-aace-43706d6df6da\\final_dashboard_telecom.png' });

    console.log('Screenshots captured successfully!');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await browser.close();
  }
})();
