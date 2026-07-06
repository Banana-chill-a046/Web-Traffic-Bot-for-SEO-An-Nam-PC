export default async function handler(req, res) {
  // Set headers
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  try {
    // Danh sách URL cần truy cập - 4 WEBSITE
    const urls = [
      'https://www.annampc.io.vn',
      'https://nammc.nammc.click',
      'https://testpc.nammc.click',
      'https://hoanghaopc.com'
    ];
    
    const results = [];
    
    // Truy cập từng URL
    for (const url of urls) {
      try {
        console.log(`🌐 Đang truy cập: ${url}`);
        
        const response = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          },
          signal: AbortSignal.timeout(10000) // 10 giây timeout
        });
        
        results.push({
          url: url,
          status: response.status,
          success: response.status === 200 || response.status === 304,
          timestamp: new Date().toISOString()
        });
        
        console.log(`✅ ${url} - Status: ${response.status}`);
        
      } catch (error) {
        console.error(`❌ ${url} - Lỗi: ${error.message}`);
        
        results.push({
          url: url,
          success: false,
          error: error.message,
          timestamp: new Date().toISOString()
        });
      }
    }
    
    // Đếm số thành công
    const successCount = results.filter(r => r.success).length;
    
    // Trả kết quả
    return res.status(200).json({
      success: true,
      message: `✅ Đã truy cập ${results.length} website (${successCount} thành công)`,
      total: results.length,
      successCount: successCount,
      results: results,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}
