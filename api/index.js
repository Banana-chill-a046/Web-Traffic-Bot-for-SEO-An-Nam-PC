export default async function handler(req, res) {
  // Bắt buộc phải set Content-Type là JSON
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  try {
    const urls = ['https://annampc.io.vn'];
    const results = [];
    
    for (const url of urls) {
      try {
        const response = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        });
        
        results.push({
          url: url,
          status: response.status,
          success: response.status === 200,
          timestamp: new Date().toISOString()
        });
        
      } catch (error) {
        results.push({
          url: url,
          success: false,
          error: error.message,
          timestamp: new Date().toISOString()
        });
      }
    }
    
    // TRẢ VỀ JSON ĐÚNG FORMAT
    return res.status(200).json({
      success: true,
      message: `Đã truy cập ${results.length} URL`,
      total: results.length,
      results: results,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
