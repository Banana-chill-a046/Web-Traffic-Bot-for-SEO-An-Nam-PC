const config = {
  urls: ['https://annampc.io.vn']
};

export default async function handler(req, res) {
  // Cho phép CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  
  try {
    const results = [];
    
    for (const url of config.urls) {
      try {
        const response = await fetch(url);
        const status = response.status;
        
        results.push({
          url: url,
          status: status,
          success: status === 200 || status === 304,
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
    
    // Trả về JSON đúng format
    res.status(200).json({
      success: true,
      message: `✅ Đã truy cập ${results.length} URLs`,
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
}
