module.exports = {
  // 👇 THAY URL CỦA BẠN VÀO ĐÂY
  urls: [
    'https://www.annampc.io.vn',
    'https://testpc.annampc.io.vn',
    'https://nammc.nammc.click'
  ],
  
  // User agents đa dạng
  userAgents: [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
  ],
  
  // Cấu hình bot
  botConfig: {
    minDelay: 5000,    // Đợi tối thiểu 5 giây
    maxDelay: 15000,   // Đợi tối đa 15 giây
    scrollDepth: 3,    // Scroll 3 lần
  }
};
