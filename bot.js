const puppeteer = require('puppeteer');
const config = require('./config');

// Hàm truy cập 1 website
async function visitWebsite(url) {
  console.log(`\n🌐 Đang truy cập: ${url}`);
  
  try {
    // Khởi tạo browser
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage'
      ]
    });
    
    const page = await browser.newPage();
    
    // Chọn user agent ngẫu nhiên
    const randomUA = config.userAgents[Math.floor(Math.random() * config.userAgents.length)];
    await page.setUserAgent(randomUA);
    
    // Set viewport
    await page.setViewport({ width: 1920, height: 1080 });
    
    // Truy cập trang
    console.log('⏳ Đang tải trang...');
    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    
    // Scroll mô phỏng người dùng
    console.log('📜 Đang scroll...');
    for (let i = 0; i < config.botConfig.scrollDepth; i++) {
      await page.evaluate(`window.scrollBy(0, ${Math.random() * 500 + 200})`);
      await page.waitForTimeout(Math.random() * 1000 + 500);
    }
    
    // Lấy thông tin
    const title = await page.title();
    const currentUrl = page.url();
    
    console.log(`✅ Thành công: ${title}`);
    console.log(`🔗 URL: ${currentUrl}`);
    
    // Đóng browser
    await browser.close();
    
    return { success: true, title, url: currentUrl };
    
  } catch (error) {
    console.error(`❌ Lỗi: ${error.message}`);
    return { success: false, error: error.message };
  }
}

// Hàm chạy bot
async function runBot() {
  console.log('🚀 ===== WEB TRAFFIC BOT =====');
  console.log(`📋 Số trang cần truy cập: ${config.urls.length}`);
  console.log('⏰ Bắt đầu: ' + new Date().toLocaleString());
  console.log('==============================\n');
  
  let successCount = 0;
  let failCount = 0;
  
  for (let i = 0; i < config.urls.length; i++) {
    const url = config.urls[i];
    console.log(`\n📌 [${i+1}/${config.urls.length}]`);
    
    const result = await visitWebsite(url);
    
    if (result.success) {
      successCount++;
    } else {
      failCount++;
    }
    
    // Đợi ngẫu nhiên giữa các lần truy cập
    if (i < config.urls.length - 1) {
      const delay = Math.floor(Math.random() * 10000 + 5000);
      console.log(`⏳ Đợi ${Math.round(delay/1000)} giây trước khi truy cập trang tiếp theo...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  // Tổng kết
  console.log('\n📊 ===== KẾT QUẢ =====');
  console.log(`✅ Thành công: ${successCount}`);
  console.log(`❌ Thất bại: ${failCount}`);
  console.log(`⏰ Hoàn thành: ${new Date().toLocaleString()}`);
  console.log('=======================\n');
}

// Chạy bot
runBot();
