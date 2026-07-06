const config = {
  urls: ['https://annampc.io.vn']
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  try {
    const results = [];
    
    for (const url of config.urls) {
      try {
        const response = await fetch(url);
        results.push({
          url,
          status: response.status,
          success: response.status === 200
        });
      } catch (e) {
        results.push({ url, success: false, error: e.message });
      }
    }
    
    res.status(200).json({
      success: true,
      message: `Đã truy cập ${results.length} URLs`,
      results
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
