module.exports = async (req, res) => {
  // Cho phép CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  
  // Xử lý OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const url = req.query.url || req.body?.url || 'https://example.com';
    
    console.log(`🌐 Truy cập: ${url}`);
    
    // Dùng fetch để gọi URL
    const response = await fetch(url);
    const status = response.status;
    
    res.status(200).json({
      success: true,
      message: 'Bot đã truy cập thành công!',
      url: url,
      status: status,
      timestamp: new Date().toISOString(),
      note: 'Đây là API test, hãy thay puppeteer nếu cần'
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
};
