const puppeteer = require('puppeteer');

module.exports = async (req, res) => {
  // Cho phép CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  try {
    const { url = 'https://your-website.com' } = req.body || {};
    
    console.log(`🤖 Bot đang truy cập: ${url}`);
    
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    
    const title = await page.title();
    await browser.close();
    
    res.status(200).json({
      success: true,
      message: 'Đã truy cập thành công',
      url: url,
      title: title,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
