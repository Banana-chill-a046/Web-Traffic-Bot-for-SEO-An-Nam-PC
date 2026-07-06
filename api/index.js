const axios = require('axios');

module.exports = async (req, res) => {
  const { url = 'https://example.com' } = req.body || {};
  
  try {
    const response = await axios.get(url);
    
    res.status(200).json({
      success: true,
      url: url,
      status: response.status,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
