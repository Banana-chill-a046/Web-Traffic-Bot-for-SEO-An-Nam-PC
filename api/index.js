const puppeteer = require('puppeteer-core');

module.exports = async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox'],
      headless: true
    });
    
    const page = await browser.newPage();
    await page.goto('https://example.com');
    const title = await page.title();
    
    await browser.close();
    
    res.status(200).json({ 
      success: true, 
      title: title,
      message: 'Bot đã chạy!'
    });
    
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};
