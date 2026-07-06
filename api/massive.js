const config = require('../config.js');

// 50 quốc gia để tăng traffic
const COUNTRIES = [
  { code: 'US', flag: '🇺🇸', name: 'Hoa Kỳ' },
  { code: 'GB', flag: '🇬🇧', name: 'Anh' },
  { code: 'DE', flag: '🇩🇪', name: 'Đức' },
  { code: 'FR', flag: '🇫🇷', name: 'Pháp' },
  { code: 'JP', flag: '🇯🇵', name: 'Nhật Bản' },
  { code: 'KR', flag: '🇰🇷', name: 'Hàn Quốc' },
  { code: 'IN', flag: '🇮🇳', name: 'Ấn Độ' },
  { code: 'BR', flag: '🇧🇷', name: 'Brazil' },
  { code: 'AU', flag: '🇦🇺', name: 'Úc' },
  { code: 'CA', flag: '🇨🇦', name: 'Canada' },
  { code: 'SG', flag: '🇸🇬', name: 'Singapore' },
  { code: 'MY', flag: '🇲🇾', name: 'Malaysia' },
  { code: 'TH', flag: '🇹🇭', name: 'Thái Lan' },
  { code: 'VN', flag: '🇻🇳', name: 'Việt Nam' },
  { code: 'PH', flag: '🇵🇭', name: 'Philippines' },
  { code: 'ID', flag: '🇮🇩', name: 'Indonesia' },
  { code: 'NZ', flag: '🇳🇿', name: 'New Zealand' },
  { code: 'ZA', flag: '🇿🇦', name: 'Nam Phi' },
  { code: 'EG', flag: '🇪🇬', name: 'Ai Cập' },
  { code: 'AE', flag: '🇦🇪', name: 'UAE' },
  { code: 'SA', flag: '🇸🇦', name: 'Ả Rập' },
  { code: 'RU', flag: '🇷🇺', name: 'Nga' },
  { code: 'PL', flag: '🇵🇱', name: 'Ba Lan' },
  { code: 'NL', flag: '🇳🇱', name: 'Hà Lan' },
  { code: 'BE', flag: '🇧🇪', name: 'Bỉ' },
  { code: 'SE', flag: '🇸🇪', name: 'Thụy Điển' },
  { code: 'NO', flag: '🇳🇴', name: 'Na Uy' },
  { code: 'DK', flag: '🇩🇰', name: 'Đan Mạch' },
  { code: 'FI', flag: '🇫🇮', name: 'Phần Lan' },
  { code: 'CH', flag: '🇨🇭', name: 'Thụy Sĩ' },
  { code: 'AT', flag: '🇦🇹', name: 'Áo' },
  { code: 'IT', flag: '🇮🇹', name: 'Ý' },
  { code: 'ES', flag: '🇪🇸', name: 'Tây Ban Nha' },
  { code: 'PT', flag: '🇵🇹', name: 'Bồ Đào Nha' },
  { code: 'GR', flag: '🇬🇷', name: 'Hy Lạp' },
  { code: 'TR', flag: '🇹🇷', name: 'Thổ Nhĩ Kỳ' },
  { code: 'IL', flag: '🇮🇱', name: 'Israel' },
  { code: 'PK', flag: '🇵🇰', name: 'Pakistan' },
  { code: 'BD', flag: '🇧🇩', name: 'Bangladesh' },
  { code: 'LK', flag: '🇱🇰', name: 'Sri Lanka' },
  { code: 'NG', flag: '🇳🇬', name: 'Nigeria' },
  { code: 'KE', flag: '🇰🇪', name: 'Kenya' },
  { code: 'AR', flag: '🇦🇷', name: 'Argentina' },
  { code: 'CL', flag: '🇨🇱', name: 'Chile' },
  { code: 'CO', flag: '🇨🇴', name: 'Colombia' },
  { code: 'PE', flag: '🇵🇪', name: 'Peru' },
  { code: 'MX', flag: '🇲🇽', name: 'Mexico' }
];

// User agents đa dạng
const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/537.36 Mobile/15E148',
  'Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/537.36 Mobile/15E148'
];

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const urls = config.urls || ['https://annampc.io.vn'];
    const targetVisits = parseInt(req.query.target) || 90000;
    const countryCount = parseInt(req.query.countries) || 50;
    
    // Lấy số quốc gia cần dùng
    const selectedCountries = COUNTRIES.slice(0, countryCount);
    const urlsPerCountry = Math.ceil(targetVisits / (selectedCountries.length * urls.length));
    const maxConcurrent = parseInt(req.query.concurrent) || 50;
    
    console.log(`🎯 MỤC TIÊU: ${targetVisits} visits`);
    console.log(`🏳️ Số quốc gia: ${selectedCountries.length}`);
    console.log(`📄 Số URLs: ${urls.length}`);
    console.log(`🔄 Mỗi URL mỗi nước: ${urlsPerCountry} lần`);
    
    const startTime = Date.now();
    let totalVisits = 0;
    const allResults = [];
    
    // Hàm truy cập 1 URL từ 1 quốc gia
    const visitUrl = async (url, country) => {
      try {
        const ua = USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
        const response = await fetch(url, {
          headers: {
            'User-Agent': ua,
            'Accept-Language': `${country.code.toLowerCase()};q=0.9,en;q=0.8`,
            'Accept-Encoding': 'gzip, deflate, br',
            'Cache-Control': 'no-cache'
          },
          signal: AbortSignal.timeout(3000)
        });
        
        return {
          url,
          country: country.flag,
          status: response.status,
          success: response.status === 200 || response.status === 304
        };
      } catch (error) {
        return {
          url,
          country: country.flag,
          success: false,
          error: error.message
        };
      }
    };
    
    // Xử lý từng quốc gia
    for (const country of selectedCountries) {
      console.log(`\n🌍 Đang xử lý ${country.flag} ${country.name}`);
      const countryStart = Date.now();
      let countryVisits = 0;
      
      // Chạy nhiều lượt cho từng URL
      for (const url of urls) {
        const batchPromises = [];
        
        // Tạo các request song song
        for (let i = 0; i < urlsPerCountry; i++) {
          batchPromises.push(visitUrl(url, country));
        }
        
        // Chạy theo batch để tránh quá tải
        const results = await Promise.all(batchPromises);
        const successCount = results.filter(r => r.success).length;
        countryVisits += successCount;
        totalVisits += successCount;
        allResults.push(...results);
        
        console.log(`  📌 ${url}: ${successCount}/${results.length} thành công`);
      }
      
      const countryTime = ((Date.now() - countryStart) / 1000).toFixed(1);
      console.log(`✅ ${country.flag} ${country.name}: ${countryVisits} visits trong ${countryTime}s`);
    }
    
    const endTime = Date.now();
    const totalTime = ((endTime - startTime) / 1000).toFixed(2);
    
    // Thống kê theo quốc gia
    const countryStats = {};
    for (const r of allResults) {
      if (!countryStats[r.country]) {
        countryStats[r.country] = { total: 0, success: 0 };
      }
      countryStats[r.country].total++;
      if (r.success) countryStats[r.country].success++;
    }
    
    res.status(200).json({
      success: true,
      message: `🎯 ĐÃ ĐẠT ${totalVisits.toLocaleString()} VISITS!`,
      target: targetVisits,
      achieved: totalVisits,
      progress: `${((totalVisits / targetVisits) * 100).toFixed(1)}%`,
      totalTime: `${totalTime}s`,
      countries: selectedCountries.map(c => ({
        flag: c.flag,
        name: c.name,
        visits: countryStats[c.flag]?.total || 0,
        success: countryStats[c.flag]?.success || 0
      })),
      details: allResults.slice(0, 100), // Chỉ hiển thị 100 kết quả đầu
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
