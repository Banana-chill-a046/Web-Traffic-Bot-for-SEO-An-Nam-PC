const config = require('../config.js');

module.exports = async (req, res) => {
  // Cho phép CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  
  // Xử lý OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Lấy URL từ query param, nếu không có thì dùng từ config
    let urls = [];
    const urlParam = req.query.url;
    
    if (urlParam) {
      // Nếu có URL từ query, chỉ truy cập URL đó
      urls = [urlParam];
    } else {
      // Nếu không, lấy tất cả URL từ config.js
      urls = config.urls || [];
    }
    
    console.log(`🌐 Số URL cần truy cập: ${urls.length}`);
    
    const results = [];
    
    // Truy cập từng URL
    for (const url of urls) {
      try {
        console.log(`📌 Đang truy cập: ${url}`);
        const response = await fetch(url);
        
        results.push({
          url: url,
          status: response.status,
          success: true,
          timestamp: new Date().toISOString()
        });
        
        // Đợi 2 giây giữa các lần truy cập
        if (urls.length > 1) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
        
      } catch (error) {
        results.push({
          url: url,
          success: false,
          error: error.message,
          timestamp: new Date().toISOString()
        });
      }
    }
    
    res.status(200).json({
      success: true,
      message: `Đã truy cập ${results.length} URL`,
      total: results.length,
      results: results,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
};
