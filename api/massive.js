export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  const websites = [
    'https://www.annampc.io.vn',
    'https://nammc.nammc.click',
    'https://testpc.annampc.io.vn',
    'https://www.hoanghaopc.com'
  ];

  const results = [];
  let success = 0;
  let failed = 0;

  // Mỗi website sẽ được truy cập 22,500 lần (90,000 / 4)
  const visitsPerSite = 22500;

  for (const url of websites) {
    let siteSuccess = 0;
    let siteFailed = 0;

    for (let i = 0; i < visitsPerSite; i++) {
      try {
        const response = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        });
        if (response.ok) {
          siteSuccess++;
          success++;
        } else {
          siteFailed++;
          failed++;
        }
      } catch (e) {
        siteFailed++;
        failed++;
      }

      // Mỗi 100 lần thì log progress
      if (i % 100 === 0) {
        console.log(`📌 ${url}: ${i}/${visitsPerSite}`);
      }
    }

    results.push({
      url: url,
      success: siteSuccess,
      failed: siteFailed,
      total: siteSuccess + siteFailed
    });
  }

  return res.status(200).json({
    success: true,
    message: `✅ Đã tăng 90,000 lượt truy cập!`,
    totalVisits: success + failed,
    success: success,
    failed: failed,
    details: results,
    timestamp: new Date().toISOString()
  });
}
